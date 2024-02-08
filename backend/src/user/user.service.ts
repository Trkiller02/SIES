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
      where: [{ ci_number: createData.ci_number }, { email: createData.email }],
      select: {
        id: true,
      },
    });

    if (userSearch) {
      conflict_err(messagesEnum.conflict_err, 'El usuario ya está registrado.');
    }

    const restoreToken =
      createData.name.slice(0, 2) +
      createData.lastname.slice(0, 2) +
      createData.ci_number.slice(-2) +
      createData.email.slice(0, 2) +
      createData.ci_number.slice(0, 2);

    const user = await this.userRepo.save({
      ...createData,
      password: await bcrypt.hash(createData.password, 10),
      restoreToken: await bcrypt.hash(restoreToken, 10),
    });

    delete user.password;

    return { ...user, restoreToken: restoreToken };
  }

  async findAll(deleted = false) {
    const users = await this.userRepo.find({
      withDeleted: deleted,
    });

    if (users.length === 0) {
      not_found_err(messagesEnum.not_found, 'No existen usuarios.');
    }

    return users;
  }

  async findToAuth(query: string, pass: boolean = false): Promise<User> {
    const user = await this.userRepo.findOne({
      where: [{ ci_number: query }, { email: query }],
      select: {
        id: true,
        ci_number: true,
        name: true,
        lastname: true,
        password: true,
        email: true,
        restore_token: true,
      },
    });

    if (!user && !pass)
      not_found_err(messagesEnum.not_found, 'Usuario no encontrado.');

    return user;
  }

  async findOne(query: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: [{ ci_number: query }, { email: query }, { id: query }],
    });

    console.log(user);

    if (!user) not_found_err(messagesEnum.not_found, 'Usuario no encontrado.');

    return user;
  }

  async update(query: string, updateData: UpdateUserDto) {
    const user = await this.findOne(query);

    /* 
    DESESTRUCTURAMOS EL OBJETO PARA ACTUALIZAR
    EN ESTE CASO NOS INTERESA POR SI HAY UNA CONTRASEÑA
    O UN TOKEN DE RESTAURACION
    */
    const { password, restore_token } = updateData;

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

    if (restore_token) {
      const rTokenHashed = await bcrypt.hash(restore_token, 10);
      updateData.password = rTokenHashed;
    }

    // MANDAMOS EL OBJETO ACTUALIZADO
    return await this.userRepo.update(user, updateData);
  }

  async remove(ci_number: string) {
    const user = await this.findOne(ci_number);

    await this.userRepo.softDelete(user);

    return;
  }
}
