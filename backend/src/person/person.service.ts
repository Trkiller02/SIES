import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {
  bad_req_err,
  conflict_err,
  not_found_err,
} from 'src/utils/handlerErrors';
import { msgEnum } from 'src/utils/handlerMsg';
import { Person as PersonModel } from './entities/person.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonModel)
    private readonly personRepo: Repository<PersonModel>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<PersonModel> {
    const person = await this.findOne(createPersonDto.ci_number, true);

    if (person)
      conflict_err(
        msgEnum.conflict_err,
        'Ya existe un registro con los datos suministrados.',
      );

    return await this.personRepo.save(createPersonDto);
  }

  async findAll(): Promise<PersonModel[]> {
    const persons = await this.personRepo.find();

    if (persons.length === 0) {
      not_found_err(msgEnum.not_found, 'No existen personas registradas');
    }

    return persons;
  }

  async findOne(query, pass: boolean = false): Promise<PersonModel> {
    const person = await this.personRepo.findOne({
      where: [{ ci_number: query }, { email: query }],
    });

    if (!person && !pass)
      not_found_err(msgEnum.not_found, 'Persona no encontrado.');

    return person;
  }

  async update(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<UpdateResult> {
    const person = await this.findOne(id);
    const res = await this.personRepo.update({ci_number: person.ci_number}, updatePersonDto);

    if (res.affected === 0) bad_req_err(msgEnum.bad_req_err, res.raw);

    return res;
  }

  async remove(id: string): Promise<DeleteResult> {
    const person = await this.findOne(id);

    const res = await this.personRepo.softDelete({
      ci_number: person.ci_number,
    });

    if (res.affected === 0) bad_req_err(msgEnum.bad_req_err, res.raw);

    return res;
  }
}
