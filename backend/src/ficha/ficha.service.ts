import { Injectable } from '@nestjs/common';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { messagesEnum } from 'src/utils/handlerMsg';
import { not_found_err } from 'src/utils/handlerErrors';
import { Ficha as FichaModel } from '@prisma/client';

@Injectable()
export class FichaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFichaDto: CreateFichaDto) {
    return await this.prismaService.ficha.create({
      data: {
        ...createFichaDto,
        personalRes: '',
      },
      select: { idFicha: true },
    });
  }

  //TODO: BUSCA TODAS LAS FICHAS
  async findAll(): Promise<FichaModel[]> {
    const fichas = await this.prismaService.ficha.findMany();

    if (fichas.length === 0) {
      not_found_err(messagesEnum.not_found, 'No se encuentran regitros');
    }

    return fichas;
  }

  //TODO: BUSCA UNA FICHA
  async findOne(id: string): Promise<FichaModel> {
    const ficha = await this.prismaService.ficha.findFirst({
      where: { idFicha: id },
    });

    if (!ficha) {
      not_found_err(
        messagesEnum.not_found,
        'Puede que no exista el registro o se haya equivocado en la busqueda',
      );
    }

    return ficha;
  }

  async update(id: string, updateFichaDto: UpdateFichaDto) {
    const ficha = await this.findOne(id);

    return await this.prismaService.ficha.update({
      where: ficha,
      data: updateFichaDto,
    });
  }

  async remove(id: string) {
    const ficha = await this.findOne(id);

    return await this.prismaService.ficha.delete({
      where: ficha,
    });
  }
}
