import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRepresentDto } from './dto/create-represent.dto';
import { UpdateRepresentDto } from './dto/update-represent.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RepresentService {
  constructor(private prisma: PrismaService) {}
  async create(createRepresentDto: CreateRepresentDto) {
    const represent = await fetch(`/person/${createRepresentDto.ciNumber}`);

    const { ciNumber } = await represent.json();

    return this.prisma.represent.create({
      data: {
        personRelation: {
          connectOrCreate: {
            where: ciNumber,
            create: {
              ciNumber: createRepresentDto.ciNumber,
              firstName: createRepresentDto.firstName,
              secondName: createRepresentDto.secondName,
              firstLastName: createRepresentDto.firstLastName,
              secondLastName: createRepresentDto.secondLastName,
              homeDir: createRepresentDto.homeDir,
              homeParroquia: createRepresentDto.homeParroquia,
              homeMunicipio: createRepresentDto.homeMunicipio,
            },
          },
        },
        afinidad: createRepresentDto.afinidad,
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

  async findOne(id: string) {
    const represent = await this.prisma.represent.findUnique({
      where: { representCiNumber: id },
      include: {
        personRelation: true,
      },
    });

    if (!represent) throw new NotFoundException('Representante no encontrado');

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
