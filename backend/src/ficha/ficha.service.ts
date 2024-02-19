import { Injectable } from '@nestjs/common';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import { messagesEnum } from 'src/utils/handlerMsg';
import { not_found_err } from 'src/utils/handlerErrors';
import { Repository } from 'typeorm';
import { Ficha as FichaModel } from './entities/ficha.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FichaService {
  constructor(
    @InjectRepository(FichaModel)
    private readonly fichaRepo: Repository<FichaModel>,
    private readonly userService: UserService,
  ) {}

  async create(
    createFichaDto: CreateFichaDto,
    user: { id: string; role: number },
  ) {
    const userEntity = await this.userService.findOne(user.id);

    return await this.fichaRepo.save({
      ...createFichaDto,
      personal_res: userEntity,
    });
  }

  //TODO: BUSCA TODAS LAS FICHAS
  async findAll(etapa, deleted = false, section, level): Promise<FichaModel[]> {
    if (level || etapa || section) {
      const fichas = await this.fichaRepo.find({
        where: {
          etapa: etapa,
          level: level,
          section: section,
        },
        relations: {
          relationTable: {
            student_id: true,
          },
        },

        withDeleted: deleted,
      });
      if (fichas.length === 0) {
        not_found_err(messagesEnum.not_found, 'No se encuentran regitros');
      }

      return fichas;
    } else {
      const fichas = await this.fichaRepo.find();

      if (fichas.length === 0) {
        not_found_err(messagesEnum.not_found, 'No se encuentran regitros');
      }

      return fichas;
    }
  }

  //TODO: BUSCA UNA FICHA
  async findOne(id: string): Promise<FichaModel> {
    const ficha = await this.fichaRepo.findOne({
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

    return await this.fichaRepo.update({ id: ficha.id }, updateFichaDto);
  }

  async remove(id: string) {
    const ficha = await this.findOne(id);

    return await this.fichaRepo.softDelete({ id: ficha.id });
  }

  async egresar(listEntity: string[]) {
    return listEntity;
  }
}
