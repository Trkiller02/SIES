import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  bad_req_err,
  conflict_err,
  not_found_err,
} from 'src/utils/handlerErrors';
import { msgEnum } from 'src/utils/handlerMsg';
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
    await this.validateRole(createData.role_id);

    const restoreToken =
      createData.name.slice(0, 2) +
      createData.lastname.slice(0, 2) +
      createData.ci_number.slice(-2) +
      createData.email.slice(0, 2) +
      createData.ci_number.slice(0, 2);

    const user = await this.userRepo.save({
      ...createData,
      password: await bcrypt.hash(createData.password, 10),
      restore_token: await bcrypt.hash(restoreToken, 10),
    });

    delete user.password;
    delete user.restore_token;

    return { restore_token: restoreToken };
  }

  async findAll(deleted = false) {
    const users = await this.userRepo.find({
      withDeleted: deleted,
    });

    if (users.length === 0) {
      not_found_err(msgEnum.not_found, 'No existen usuarios.');
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
      not_found_err(msgEnum.not_found, 'Usuario no encontrado.');

    return user;
  }

  async findOne(query: string, deleted?: boolean): Promise<User> {
    const user = await this.userRepo.findOne({
      where: [{ ci_number: query }, { email: query }, { id: query }],
    });

    if (!user) not_found_err(msgEnum.not_found, 'Usuario no encontrado.');

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
      const passHashed = await bcrypt.hash(password, 10);
      updateData.password = passHashed;
    }

    if (restore_token) {
      const rTokenHashed = await bcrypt.hash(restore_token, 10);
      updateData.restore_token = rTokenHashed;
    }

    const res = await this.userRepo.update(
      { ci_number: user.ci_number },
      updateData,
    );

    if (res.affected === 0) bad_req_err(msgEnum.bad_req_err, res.raw);

    if (restore_token) {
      return { restore_token };
    }

    // MANDAMOS EL OBJETO ACTUALIZADO

    return res;
  }

  async remove(ci_number: string) {
    const user = await this.findOne(ci_number);

    return await this.userRepo.softDelete({ ci_number: user.ci_number });
  }

  async validateRole(id: number) {
    return await this.roleService.findOne(id);
  }

  async restore(query) {
    const user = await this.findOne(query, true);

    return await this.userRepo.update(
      { ci_number: user.ci_number },
      { deleted_at: null },
    );
  }
}
