import { Injectable } from '@nestjs/common';
import { CreateHealtInfoDto } from './dto/create-healt-info.dto';
import { UpdateHealtInfoDto } from './dto/update-healt-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { not_found_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';

@Injectable()
export class HealtInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHealtInfoDto: CreateHealtInfoDto) {
    return await this.prisma.status.create({
      data: createHealtInfoDto,
      select: { idStatus: true },
    });
  }

  async findAll() {
    const healt_info = await this.prisma.status.findMany();

    if (healt_info.length === 0) {
      not_found_err(messagesEnum.not_found, 'No se encuentran registros.');
    }

    return healt_info;
  }

  async findOne(id: string) {
    const healt_info = await this.prisma.status.findFirst({
      where: {
        idStatus: id,
      },
    });
    if (!healt_info)
      not_found_err(messagesEnum.not_found, 'No se encontro el registro.');

    return healt_info;
  }

  async update(id: string, updateHealtInfoDto: UpdateHealtInfoDto) {
    const healt_info = await this.findOne(id);
    return await this.prisma.status.update({
      where: healt_info,
      data: updateHealtInfoDto,
    });
  }

  async remove(id: string) {
    const healt_info = await this.findOne(id);
    return await this.prisma.status.delete({
      where: healt_info,
    });
  }
}
