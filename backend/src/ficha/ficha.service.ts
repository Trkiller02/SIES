import { Injectable } from '@nestjs/common';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FichaService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createFichaDto: CreateFichaDto) {
    const ficha = await this.prismaService.ficha.create({
      data: createFichaDto,
    });

    return ficha.idFicha;
  }

  findAll() {
    return `This action returns all ficha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ficha`;
  }

  update(id: number, updateFichaDto: UpdateFichaDto) {
    return `This action updates a #${id} ficha`;
  }

  remove(id: number) {
    return `This action removes a #${id} ficha`;
  }
}
