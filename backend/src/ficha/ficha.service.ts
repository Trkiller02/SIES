import { Injectable } from '@nestjs/common';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import { messagesEnum } from 'src/utils/handlerMsg';
import { not_found_err } from 'src/utils/handlerErrors';
import { Not, Repository } from 'typeorm';
import { Ficha as FichaModel } from './entities/ficha.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FichaService {
  constructor(
    @InjectRepository(FichaModel)
    private readonly fichaRepo: Repository<FichaModel>,
  ) {}

  async create(createFichaDto: CreateFichaDto) {
    return await this.fichaRepo.save({
      ...createFichaDto,
    });
  }

  //TODO: BUSCA TODAS LAS FICHAS
  async findAll(querys: any | undefined): Promise<FichaModel[]> {
    const { level, etapa, section } = querys;

    if (level || etapa || section) {
      const fichas = await this.fichaRepo.find({
        where: {
          level: level,
          etapa: etapa,
          section: section,
          relationTable: Not(null),
        },
        //FIXME TRAER NOMBRE COMPLETO Y CEDULA DEL ESTUDIANTE
        relations: {
          relationTable: {
            student_id: true,
          },
        },
      });
      if (fichas.length === 0) {
        not_found_err(messagesEnum.not_found, 'No se encuentran regitros');
      }

      return fichas;
    } else {
      const fichas = await this.fichaRepo.find({
        loadRelationIds: true,
      });

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
        {
          relationTable: {
            student_id: {
              person_id: {
                ciNumber: id,
              },
            },
          },
        },
        {
          id: id,
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

    return await this.fichaRepo.update(ficha, updateFichaDto);
  }

  async remove(id: string) {
    const ficha = await this.findOne(id);

    return await this.fichaRepo.delete(ficha);
  }
}
