import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { conflict_err, not_found_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createData: CreateUserDto) {
    const user = await this.userRepository.find({
      where: [{ ciNumber: createData.ciNumber }, { email: createData.email }],
      select: {
        id: true,
      },
    });

    if (user)
      conflict_err(messagesEnum.conflict_err, 'El usuario ya está registrado.');

    const passHashed = await bcrypt.hash(createData.password, 10);
    createData.password = passHashed;

    return await this.userRepository.create(createData);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      not_found_err(messagesEnum.not_found, 'No existen usuarios.');
    }

    return users;
  }

  async findToAuth(ciNumber?: string, email?: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ ciNumber: ciNumber }, { email: email }],
    });

    if (!user) not_found_err(messagesEnum.not_found, 'Usuario no encontrado.');

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        ciNumber: id,
      },
      loadRelationIds: true,
    });

    if (!user) not_found_err(messagesEnum.not_found, 'Usuario no encontrado.');

    return user;
  }

  // ... ...
  async update(ciNumber: string, updateData: UpdateUserDto) {
    const user = await this.findOne(ciNumber);

    /* 
    DESESTRUCTURAMOS EL OBJETO PARA ACTUALIZAR
    EN ESTE CASO NOS INTERESA POR SI HAY UNA CONTRASEÑA
    O UN TOKEN DE RESTAURACION
    */
    const { password, restoreToken } = updateData;

    // SI EXITEN VALORES PARA ESTAS VARIABLES
    // SE REALIZA LA ENCRIPTACION
    if (password) {
      /* 
      ENCRIPTAMOS LA NUEVA CONTRASEÑA 
      E INYECTAMOS LOS DATOS EN EL  OBJETO DE ACTUALIZACION
      */
      const passHashed = await bcrypt.hash(password, 10);
      updateData.password = passHashed;
    }

    if (restoreToken) {
      const rTokenHashed = await bcrypt.hash(restoreToken, 10);
      updateData.password = rTokenHashed;
    }

    // MANDAMOS EL OBJETO ACTUALIZADO
    return await this.userRepository.update(user, updateData);
  }

  async remove(ciNumber: string) {
    const user = await this.findOne(ciNumber);

    await this.userRepository.softDelete(user);

    return;
  }
}
