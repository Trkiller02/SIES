import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRepresentDto } from './dto/create-represent.dto';
import { UpdateRepresentDto } from './dto/update-represent.dto';
import { PersonService } from 'src/person/person.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RepresentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly personService: PersonService,
  ) {}

  async create(createRepresentDto: CreateRepresentDto) {
    const represent = await this.findOne(createRepresentDto.ciNumber, true);

    if (represent) throw new ConflictException('El representante ya existe');

    const person = await this.personService.findOne(
      createRepresentDto.ciNumber,
      true,
    );

    if (person) {
      return this.prisma.represent.create({
        data: {
          personRelation: {
            connect: { ciNumber: person.ciNumber },
          },
          civilStatus: createRepresentDto.civilStatus,
          Instrution: createRepresentDto.Instrution,
          profession: createRepresentDto.profession,
          business: createRepresentDto.business,
          workPlace: createRepresentDto.workPlace,
          workPhoneNumber: createRepresentDto.workPhoneNumber,
          workEmail: createRepresentDto.workEmail,
          incomeMonth: createRepresentDto.incomeMonth,
          sourceIncome: createRepresentDto.sourceIncome,
        },
        include: {
          personRelation: true,
        },
      });
    }

    return this.prisma.represent.create({
      data: {
        personRelation: {
          create: {
            ciNumber: createRepresentDto.ciNumber,
            firstName: createRepresentDto.firstName,
            secondName: createRepresentDto.secondName,
            firstLastName: createRepresentDto.firstLastName,
            secondLastName: createRepresentDto.secondLastName,
            homeDir: createRepresentDto.homeDir,
            homeParroquia: createRepresentDto.homeParroquia,
            homeMunicipio: createRepresentDto.homeMunicipio,
            relation: createRepresentDto.relation,
          },
        },
        civilStatus: createRepresentDto.civilStatus,
        Instrution: createRepresentDto.Instrution,
        profession: createRepresentDto.profession,
        business: createRepresentDto.business,
        workPlace: createRepresentDto.workPlace,
        workPhoneNumber: createRepresentDto.workPhoneNumber,
        workEmail: createRepresentDto.workEmail,
        incomeMonth: createRepresentDto.incomeMonth,
        sourceIncome: createRepresentDto.sourceIncome,
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
      throw new NotFoundException(`No se encontraron registros`);

    return represent;
  }

  async findOne(id: string, pass?: boolean) {
    const represent = await this.prisma.represent.findUnique({
      where: { representCiNumber: id },
      include: {
        personRelation: true,
      },
    });

    if (!represent && !pass)
      throw new NotFoundException('Representante no encontrado');

    return represent;
  }

  async update(ciNumber: string, updateRepresentDto: UpdateRepresentDto) {
    const represent = await this.prisma.represent.findUnique({
      where: { representCiNumber: ciNumber },
      select: { representCiNumber: true },
    });

    if (!represent) throw new NotFoundException('Representante no encontrado');

    return await this.prisma.represent.update({
      where: represent,
      data: updateRepresentDto,
    });
  }

  async remove(ciNumber: string) {
    const represent = await this.prisma.represent.findUnique({
      where: { representCiNumber: ciNumber },
      select: { representCiNumber: true },
    });

    if (!represent) throw new NotFoundException('Representante no encontrado');

    return this.prisma.represent.delete({ where: represent });
  }
}
