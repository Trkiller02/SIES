import { Injectable } from '@nestjs/common';
import { CreateRelationsTableDto } from './dto/create-relations-table.dto';
import { UpdateRelationsTableDto } from './dto/update-relations-table.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { not_found_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';

@Injectable()
export class RelationsTableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateRelationsTableDto) {
    return await this.prisma.relationTable.create({
      data: createDto,
    });
  }

  async findAll() {
    const tables = await this.prisma.relationTable.findMany();
    if (tables.length === 0) {
      not_found_err(messagesEnum.not_found, 'No se encontraron registros');
    }
    return tables;
  }

  async findOne(id: string) {
    const table = await this.prisma.relationTable.findFirst({
      where: { studentId: id },
      include: {
        representRelation: true,
        fichaRelation: true,
        motherPersonRelation: true,
        fatherPersonRelation: true,
        thirdPersonRelation: true,
        statusRelation: true,
        studentRelation: true,
      },
    });

    if (table)
      not_found_err(
        messagesEnum.not_found,
        'No existe el registro o se equivoco en la busqueda.',
      );

    return table;
  }

  async findOneToMethods(id: string) {
    const table = await this.prisma.relationTable.findFirst({
      where: { studentId: id },
    });

    if (table)
      not_found_err(
        messagesEnum.not_found,
        'No existe el registro o se equivoco en la busqueda.',
      );

    return table;
  }

  async update(id: string, updateRelationsTableDto: UpdateRelationsTableDto) {
    const table = await this.findOneToMethods(id);

    return this.prisma.relationTable.update({
      where: table,
      data: updateRelationsTableDto,
    });
  }

  async remove(id: string) {
    const table = await this.findOneToMethods(id);

    return this.prisma.relationTable.delete({
      where: table,
    });
  }
}
