import { Injectable } from '@nestjs/common';
import { CreateRelationsTableDto } from './dto/create-relations-table.dto';
import { UpdateRelationsTableDto } from './dto/update-relations-table.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RelationsTableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRelationsTableDto: CreateRelationsTableDto) {
    return await this.prisma.relationTable.create({
      data: createRelationsTableDto,
    });
  }

  async findAll() {
    return `This action returns all relationsTable`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} relationsTable`;
  }

  async update(id: number, updateRelationsTableDto: UpdateRelationsTableDto) {
    return `This action updates a #${id} relationsTable`;
  }

  async remove(id: number) {
    return `This action removes a #${id} relationsTable`;
  }
}
