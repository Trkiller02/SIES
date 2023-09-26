import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRepresentDto } from './dto/create-represent.dto';
import { UpdateRepresentDto } from './dto/update-represent.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RepresentService {
  constructor(private prisma: PrismaService) {}
  async create(createRepresentDto: CreateRepresentDto) {
    const res = await fetch(`/person/${createRepresentDto.ciNumber}`);
    const { id } = await res.json();

    return this.prisma.represent.create({
      data: {
        personRelation: {
          connectOrCreate: {
            where: { ciNumber: id },
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
    const res = await this.prisma.represent.findMany({
      include: {
        personRelation: true,
      },
    });
    if (res.length === 0) {
      throw new NotFoundException(`No results found`);
    } else {
      return res;
    }
  }

  async findOne(id: string) {
    return await this.prisma.represent.findUnique({
      where: { representCiNumber: id },
      include: {
        personRelation: true,
      },
    });
  }

  async update(id: string, updateRepresentDto: UpdateRepresentDto) {
    return await this.prisma.represent.update({
      where: { representCiNumber: id },
      data: updateRepresentDto,
    });
  }

  async remove(id: string) {
    return this.prisma.represent.delete({ where: { representCiNumber: id } });
  }
}
