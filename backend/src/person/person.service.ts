import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { conflict_err, not_found_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';
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
    const person = await this.findOne(
      createPersonDto.ci_number,
      createPersonDto.email,
    );

    if (person)
      conflict_err(
        messagesEnum.conflict_err,
        'La persona ya existe o los datos están ingresados en otra persona.',
      );

    return await this.personRepo.save(createPersonDto);
  }

  async findAll(): Promise<PersonModel[]> {
    const persons = await this.personRepo.find();

    if (persons.length === 0) {
      not_found_err(messagesEnum.not_found, 'No existen personas registradas');
    }

    return persons;
  }

  async findOne(
    id: string,
    email?: string,
    pass?: boolean,
  ): Promise<PersonModel> {
    const person = await this.personRepo.findOne({
      where: [{ ci_number: id }, { email: email }],
    });

    if (!person && !pass)
      not_found_err(messagesEnum.not_found, 'Usuario no encontrado.');

    return person;
  }

  async update(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<UpdateResult> {
    const person = await this.findOne(id);

    return await this.personRepo.update(person, updatePersonDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    const person = await this.findOne(id);

    return await this.personRepo.delete(person);
  }
}
