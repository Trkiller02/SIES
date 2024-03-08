import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { bad_req_err, not_found_err } from 'src/utils/handlerErrors';
import { msgEnum } from 'src/utils/handlerMsg';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepo.save(createRoleDto);
  }

  async findAll() {
    const roles = await this.roleRepo.find();

    if (!roles) not_found_err(msgEnum.not_found, 'No se encontraron registros');

    return roles;
  }

  async findOne(id: number) {
    const role = await this.roleRepo.findOneBy({ id: id });

    if (!role || role.id === 1) {
      not_found_err(msgEnum.not_found, 'Rol no encontrado.');
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);

    return await this.roleRepo.update(role.id, updateRoleDto);
  }

  async remove(id: number) {
    const role = await this.findOne(id);

    return await this.roleRepo.softDelete(role.id);
  }

  async seed() {
    try {
      const roles = await this.roleRepo.create([
        {
          id: 1,
          name: 'ADMINISTRADOR',
        },
        {
          id: 2,
          name: 'EVALUACION',
        },
        {
          id: 3,
          name: 'DOCENTE',
        },
        {
          id: 4,
          name: 'ADMINISTRACION',
        },
      ]);

      await this.roleRepo.insert(roles);
    } catch (error) {
      bad_req_err(msgEnum.seeder, (error as Error).message);
    }
  }
}
