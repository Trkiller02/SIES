import { Injectable } from '@nestjs/common';
import { CreateRepresentDto } from './dto/create-represent.dto';
import { UpdateRepresentDto } from './dto/update-represent.dto';
import { PersonService } from 'src/person/person.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { conflict_err, not_found_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';

@Injectable()
export class RepresentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly personService: PersonService,
  ) {}

  async create(createRepresentDto: CreateRepresentDto) {
    await this.findOne(createRepresentDto.ciNumber, true);

    const person = await this.personService.findOneForRelation(
      createRepresentDto.ciNumber,
      true,
    );

    if (person) {
      await this.prisma.represent.create({
        data: {
          personRelation: {
            connect: { ciNumber: person.ciNumber },
          },
          tlfnHome: createRepresentDto.tlfnHome,
          profession: createRepresentDto.profession,
          workPlace: createRepresentDto.workPlace,
          workPhoneNumber: createRepresentDto.workPhoneNumber,
          incomeMonth: createRepresentDto.incomeMonth,
        },
        include: {
          personRelation: true,
        },
      });
      await this.personService.updateRelation(person.ciNumber);

      return person.ciNumber;
    }

    return this.prisma.represent.create({
      data: {
        personRelation: {
          create: {
            ciNumber: createRepresentDto.ciNumber,
            name: createRepresentDto.name,
            lastName: createRepresentDto.lastName,
            homeDir: createRepresentDto.homeDir,
            homeParroquia: createRepresentDto.homeParroquia,
            homeMunicipio: createRepresentDto.homeMunicipio,
            relation: createRepresentDto.relation,
          },
        },
        profession: createRepresentDto.profession,
        workPlace: createRepresentDto.workPlace,
        workPhoneNumber: createRepresentDto.workPhoneNumber,
        incomeMonth: createRepresentDto.incomeMonth,
      },
      include: {
        personRelation: true,
      },
    });
  }

  async findAll() {
    const represent = await this.prisma.represent.findMany({
      include: {
        personRelation: true,
      },
    });

    if (represent.length === 0)
      not_found_err(messagesEnum.not_found, 'No se encontraron registros.');

    return represent;
  }

  async findOne(id: string, pass?: boolean) {
    const represent = await this.prisma.represent.findUnique({
      where: { representCiNumber: id },
      include: {
        personRelation: true,
      },
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

    return await this.prisma.represent.update({
      where: represent,
      data: updateRepresentDto,
    });
  }

  async remove(id: string) {
    const represent = await this.findOne(id);

    return this.prisma.represent.delete({ where: represent });
  }
}
