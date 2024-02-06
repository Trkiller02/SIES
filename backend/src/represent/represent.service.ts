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
import { conflict_err, not_found_err } from 'src/utils/handlerErrors';
//MESSAGES
import { messagesEnum } from 'src/utils/handlerMsg';

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
      not_found_err(messagesEnum.not_found, 'No se encontraron registros.');

    return represent;
  }

  async findOne(id: string, deleted: boolean = false, pass?: boolean) {
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
        messagesEnum.conflict_err,
        'Ya existe un registro con los datos suministrados.',
      );

    if (!represent && !pass)
      not_found_err(messagesEnum.not_found, 'Representante no encontrado.');

    return represent;
  }

  async update(id: string, updateRepresentDto: UpdateRepresentDto) {
    const represent = await this.findOne(id);

    return await this.representRepo.update(represent, updateRepresentDto);
  }

  async remove(id: string) {
    const represent = await this.findOne(id);

    return this.representRepo.softDelete(represent);
  }
}
