import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Person as PersonModel } from '@prisma/client';

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

    if (person) throw new ConflictException('La persona ya existe ya existe');

    return await this.prisma.person.create({
      data: createPersonDto,
    });
  }

  async findAll(): Promise<PersonModel[]> {
    const persons = await this.prisma.person.findMany();

    if (persons.length === 0) {
      throw new NotFoundException('No existen personas registradas');
    }

    return persons;
  }

  async findOne(id: string, pass?: boolean): Promise<PersonModel> {
    const person = await this.prisma.person.findFirst({
      where: {
        ciNumber: id,
      },
    });

    if (!person && !pass) throw new NotFoundException('Usuario no encontrado');

    return person;
  }

  async update(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<PersonModel> {
    const ciNumber = await this.prisma.person.findFirst({
      where: { ciNumber: id },
      select: { ciNumber: true },
    });

    if (!ciNumber) throw new NotFoundException('Usuario no encontrado');

    return await this.prisma.person.update({
      where: ciNumber,
      data: updatePersonDto,
    });
  }

  async remove(id: string): Promise<PersonModel> {
    const ciNumber = await this.prisma.person.findFirst({
      where: { ciNumber: id },
      select: { ciNumber: true },
    });

    if (!ciNumber) throw new NotFoundException('Usuario no encontrado');

    return await this.prisma.person.delete({
      where: ciNumber,
    });
  }
}
