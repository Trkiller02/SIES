import { Injectable } from '@nestjs/common';
import { CreateHealtInfoDto } from './dto/create-healt-info.dto';
import { UpdateHealtInfoDto } from './dto/update-healt-info.dto';
import { bad_req_err, not_found_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';
import { InjectRepository } from '@nestjs/typeorm';
import { HealtInfo } from './entities/healt-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HealtInfoService {
  constructor(
    @InjectRepository(HealtInfo)
    private readonly healtInfoRepo: Repository<HealtInfo>,
  ) {}

  async create(createHealtInfoDto: CreateHealtInfoDto): Promise<HealtInfo> {
    return await this.healtInfoRepo.save(createHealtInfoDto);
  }

  async findAll(): Promise<HealtInfo[]> {
    const healt_info = await this.healtInfoRepo.find();

    if (healt_info.length === 0) {
      not_found_err(messagesEnum.not_found, 'No se encuentran registros.');
    }

    return healt_info;
  }

  async findOne(id: string): Promise<HealtInfo | null> {
    const healt_info: HealtInfo = await this.healtInfoRepo.findOneBy({
      id: id,
    });

    if (!healt_info)
      not_found_err(messagesEnum.not_found, 'No se encontro el registro.');

    return healt_info;
  }

  async update(id: string, updateHealtInfoDto: UpdateHealtInfoDto) {
    const healt_info: HealtInfo = await this.findOne(id);

    return await this.healtInfoRepo.update(healt_info, updateHealtInfoDto);
  }

  async remove(id: string) {
    const healt_info: HealtInfo = await this.findOne(id);

    const result = await this.healtInfoRepo.delete(healt_info);

    if (result.affected === null || result.affected === 0) {
      bad_req_err(messagesEnum.bad_req_err, 'No se pudo procesar la petición.');
    }

    return result;
  }
}
