import { Injectable } from '@nestjs/common';
import { not_found_err } from 'src/utils/handlerErrors';
import { msgEnum } from 'src/utils/handlerMsg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthInfo } from './entities/health-info.entity';
import { CreateHealthInfoDto } from './dto/create-health-info.dto';
import { UpdateHealthInfoDto } from './dto/update-health-info.dto';

@Injectable()
export class HealthInfoService {
  constructor(
    @InjectRepository(HealthInfo)
    private readonly HealthInfoRepo: Repository<HealthInfo>,
  ) {}

  async create(createHealthInfoDto: CreateHealthInfoDto): Promise<HealthInfo> {
    return await this.HealthInfoRepo.save(createHealthInfoDto);
  }

  async findAll(): Promise<HealthInfo[]> {
    const health_info = await this.HealthInfoRepo.find({
      relations: {
        relationTable: true,
      },
    });

    const result = health_info.filter(
      (object) => object.relationTable !== null,
    );

    if (result.length === 0) {
      not_found_err(msgEnum.not_found, 'No se encuentran registros.');
    }

    return result;
  }

  async findOne(id: string): Promise<HealthInfo | null> {
    const health_info: HealthInfo = await this.HealthInfoRepo.findOne({
      where: [
        { id: id },
        {
          relationTable: {
            student_id: {
              person_id: {
                ci_number: id,
              },
            },
          },
        },
      ],
    });

    if (!health_info)
      not_found_err(msgEnum.not_found, 'No se encontro el registro.');

    return health_info;
  }

  async update(id: string, updateHealthInfoDto: UpdateHealthInfoDto) {
    const health_info: HealthInfo = await this.findOne(id);

    return await this.HealthInfoRepo.update(health_info, updateHealthInfoDto);
  }

  async remove(id: string) {
    const health_info: HealthInfo = await this.findOne(id);

    return await this.HealthInfoRepo.delete({ id: health_info.id });
  }
}
