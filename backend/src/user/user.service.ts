import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { conflict_err, not_found_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async create(createData: CreateUserDto) {
    const userSearch = await this.userRepo.findOne({
      where: [{ ciNumber: createData.ciNumber }, { email: createData.email }],
      select: {
        id: true,
      },
    });

    if (userSearch) {
      conflict_err(messagesEnum.conflict_err, 'El usuario ya está registrado.');
    }

    const restoreToken =
      createData.name.slice(0, 2) +
      createData.lastName.slice(0, 2) +
      createData.ciNumber.slice(-2) +
      createData.email.slice(0, 2) +
      createData.ciNumber.slice(0, 2);

    const user = await this.userRepo.save({
      ...createData,
      password: await bcrypt.hash(createData.password, 10),
      restoreToken: await bcrypt.hash(restoreToken, 10),
    });

    delete user.password;

    return { ...user, restoreToken: restoreToken };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepo.find();

    if (users.length === 0) {
      not_found_err(messagesEnum.not_found, 'No existen usuarios.');
    }

    return users;
  }

  async findToAuth(query: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: [{ ciNumber: query }, { email: query }],
      select: {
        id: true,
        ciNumber: true,
        name: true,
        lastName: true,
        password: true,
        email: true,
      },
    });

    if (!user) not_found_err(messagesEnum.not_found, 'Usuario no encontrado.');

    return user;
  }

  async findOne(query: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: [{ ciNumber: query }, { email: query }, { id: query }],
    });

    console.log(user);

    if (!user) not_found_err(messagesEnum.not_found, 'Usuario no encontrado.');

    return user;
  }

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
    return await this.userRepo.update(user, updateData);
  }

  async remove(ciNumber: string) {
    const user = await this.findOne(ciNumber);

    await this.userRepo.softDelete(user);

    return;
  }
}
