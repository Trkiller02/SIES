import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//ENTITY
import { RelationsTable } from './entities/relations-table.entity';
//DTOs
import { CreateRelationsTableDto } from './dto/create-relations-table.dto';
import { UpdateRelationsTableDto } from './dto/update-relations-table.dto';
//ERROR HANDLERS
import { not_found_err } from 'src/utils/handlerErrors';
//MESSAGES ENUM
import { msgEnum } from 'src/utils/handlerMsg';

@Injectable()
export class RelationsTableService {
  constructor(
    @InjectRepository(RelationsTable)
    private readonly relationRepo: Repository<RelationsTable>,
  ) {}

  async create(createDto: CreateRelationsTableDto) {
    return await this.relationRepo.save(createDto);
  }

  async findAll() {
    const tables = await this.relationRepo.find();

    if (tables.length === 0) {
      not_found_err(msgEnum.not_found, 'No se encontraron registros');
    }
    return tables;
  }

  async findOne(id: string, simple: boolean = false) {
    if (!simple) {
      const table = await this.relationRepo.findOne({
        where: [
          { id: id },
          {
            student_id: {
              person_id: {
                ci_number: id,
              },
            },
          },
          {
            student_id: {
              id: id,
            },
          },
          {
            ficha_id: {
              id: id,
            },
          },
        ],
        relations: {
          student_id: true,
          ficha_id: true,
          health_info_id: true,
          represent_id: true,
          mother_id: true,
          father_id: true,
        },
      });

      if (!table)
        not_found_err(
          msgEnum.not_found,
          'No existe el registro o se equivoco en la busqueda.',
        );

      return table;
    } else {
      const table = await this.relationRepo.findOne({
        where: [
          { id: id },
          {
            student_id: {
              person_id: {
                ci_number: id,
              },
            },
          },
          {
            ficha_id: {
              id: id,
            },
          },
        ],
      });

      if (!table)
        not_found_err(
          msgEnum.not_found,
          'No existe el registro o se equivoco en la busqueda.',
        );

      return table;
    }
  }

  async update(id: string, updateRelationsTableDto: UpdateRelationsTableDto) {
    const table = await this.findOne(id, true);

    return await this.relationRepo.update(table, updateRelationsTableDto);
  }

  async remove(id: string) {
    const table = await this.findOne(id, true);

    return this.relationRepo.softDelete({ id: table.id });
  }
}
