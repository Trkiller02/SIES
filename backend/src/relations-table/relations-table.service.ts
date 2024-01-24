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
import { messagesEnum } from 'src/utils/handlerMsg';
//SERVICE
import { FichaService } from 'src/ficha/ficha.service';
import { HealtInfoService } from 'src/healt-info/healt-info.service';
import { StudentService } from 'src/student/student.service';
import { RepresentService } from 'src/represent/represent.service';

@Injectable()
export class RelationsTableService {
  constructor(
    @InjectRepository(RelationsTable)
    private readonly relationRepo: Repository<RelationsTable>,
    private readonly fichaService: FichaService,
    private readonly hInfoService: HealtInfoService,
    private readonly studentService: StudentService,
    private readonly representService: RepresentService,
  ) {}

  async create(createDto: CreateRelationsTableDto) {
    const represent = await this.representService.create(
      createDto.represent_id,
    );

    const mother_id = createDto.mother_id
      ? await this.representService.create(createDto.mother_id)
      : null;

    const father_id = createDto.father_id
      ? await this.representService.create(createDto.father_id)
      : null;

    return await this.relationRepo.create({
      represent_id: represent,
      mother_id: mother_id,
      father_id: father_id,
    });
  }

  async findAll() {
    const tables = await this.relationRepo.find();
    if (tables.length === 0) {
      not_found_err(messagesEnum.not_found, 'No se encontraron registros');
    }
    return tables;
  }

  async findOne(id: string) {
    const table = await this.relationRepo.findOne({
      where: [
        {
          student_id: {
            person_id: {
              ciNumber: id,
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
        messagesEnum.not_found,
        'No existe el registro o se equivoco en la busqueda.',
      );

    return table;
  }

  async update(id: string, updateRelationsTableDto: UpdateRelationsTableDto) {
    const table = await this.findOne(id);

    return this.relationRepo.update(table, updateRelationsTableDto);
  }

  async remove(id: string) {
    const table = await this.findOne(id);

    return this.relationRepo.delete(table);
  }
}
