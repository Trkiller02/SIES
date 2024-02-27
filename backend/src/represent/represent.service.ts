import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//SERVICIOS
import { PersonService } from 'src/person/person.service';
//ENTITY
import { Represent } from './entities/represent.entity';
//DTOs
import { CreateRepresentDto } from './dto/create-represent.dto';
import { UpdateRepresentDto } from './dto/update-represent.dto';
//ERROR HANDLER
import {
  bad_req_err,
  conflict_err,
  not_found_err,
} from 'src/utils/handlerErrors';
//MESSAGES
import { msgEnum } from 'src/utils/handlerMsg';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class RepresentService {
  constructor(
    @InjectRepository(Represent)
    private readonly representRepo: Repository<Represent>,
    private readonly personService: PersonService,
  ) {}

  async create(createRepresentDto: CreateRepresentDto) {
    const person = await this.personService.create(
      createRepresentDto.person_id,
    );

    const represent = await this.representRepo.save({
      person_id: person,
      ...createRepresentDto,
    });

    return represent;
  }

  async findAll(deleted: boolean = false) {
    const represent = await this.representRepo.find({
      withDeleted: deleted,
    });

    if (represent.length === 0)
      not_found_err(msgEnum.not_found, 'No se encontraron registros.');

    return represent;
  }

  async findOne(
    id: string,
    deleted: boolean = false,
    pass?: boolean,
    toFielter: boolean = false,
  ) {
    if (toFielter) {
      const represent = await this.representRepo.findOne({
        where: [
          { id: id },
          {
            person_id: {
              ci_number: id,
            },
          },
        ],
        select: {
          id: true,
          person_id: {
            ci_number: true,
            phone_number: true,
            email: true,
            name: true,
            lastname: true,
          },
        },
        withDeleted: deleted,
      });
      if (!represent && !pass)
        not_found_err(msgEnum.not_found, 'Representante no encontrado.');

      return represent;
    }
    const represent = await this.representRepo.findOne({
      where: [
        { id: id },
        {
          person_id: {
            ci_number: id,
          },
        },
      ],
      withDeleted: deleted,
    });

    if (represent && pass)
      conflict_err(
        msgEnum.conflict_err,
        'Ya existe un registro con los datos suministrados.',
      );

    if (!represent && !pass)
      not_found_err(msgEnum.not_found, 'Representante no encontrado.');

    return represent;
  }

  async update(id: string, updateRepresentDto: UpdateRepresentDto) {
    const represent = await this.findOne(id);

    console.log(updateRepresentDto)

    if (updateRepresentDto.person_id) {
      await this.personService.update(
        (represent.person_id as Person).ci_number,
        updateRepresentDto.person_id,
      );
    }

    const res = await this.representRepo.update(
      { id: represent.id },
      {
        ...updateRepresentDto,
        person_id: updateRepresentDto.person_id.ci_number,
      },
    );

    if (res.affected === 0) bad_req_err(msgEnum.bad_req_err, res.raw);

    return res;
  }

  async remove(id: string) {
    const represent = await this.findOne(id);

    await this.personService.remove((represent.person_id as Person).ci_number);

    const res = await this.representRepo.softDelete({ id: represent.id });

    if (res.affected === 0) bad_req_err(msgEnum.bad_req_err, res.raw);

    return res;
  }
}
