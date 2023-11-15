import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Person as PersonModel } from '@prisma/client';
import { conflict_err, not_found_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto): Promise<PersonModel> {
    const person = await this.prisma.person.findFirst({
      where: {
        OR: [
          { ciNumber: { equals: createPersonDto.ciNumber } },
          { email: { equals: createPersonDto.email } },
        ],
      },
    });

    if (person)
      conflict_err(
        messagesEnum.conflict_err,
        'La persona ya existe o los datos están ingresados en otra persona.',
      );

    return await this.prisma.person.create({
      data: createPersonDto,
    });
  }

  async findAll(): Promise<PersonModel[]> {
    const persons = await this.prisma.person.findMany();

    if (persons.length === 0) {
      not_found_err(messagesEnum.not_found, 'No existen personas registradas');
    }

    return persons;
  }

  async findOne(id: string, pass?: boolean): Promise<PersonModel> {
    const person = await this.prisma.person.findFirst({
      where: {
        ciNumber: id,
      },
    });

    if (!person && !pass)
      not_found_err(messagesEnum.not_found, 'Usuario no encontrado.');

    return person;
  }

  async findOneForRelation(id: string, pass?: boolean): Promise<PersonModel> {
    const person = await this.prisma.person.findFirst({
      where: {
        ciNumber: id,
        Represent: null,
      },
    });

    if (!person && !pass)
      not_found_err(messagesEnum.not_found, 'Persona no encontrado.');

    return person;
  }

  async update(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<PersonModel> {
    const ciNumber = await this.findOne(id);

    return await this.prisma.person.update({
      where: ciNumber,
      data: updatePersonDto,
    });
  }

  async updateRelation(id: string): Promise<PersonModel> {
    const person = await this.findOne(id);

    return await this.prisma.person.update({
      where: person,
      data: {
        relation: person.relation + ',RL',
      },
    });
  }

  async remove(id: string): Promise<PersonModel> {
    const person = await this.findOne(id);

    return await this.prisma.person.delete({
      where: person,
    });
  }
}
