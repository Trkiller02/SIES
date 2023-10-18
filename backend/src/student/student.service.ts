import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonService } from 'src/person/person.service';
import { Student as StudentModel } from '@prisma/client';
import { conflict_err, not_found_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly personService: PersonService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const person = await this.personService.findOneForRelation(
      createStudentDto.ciNumber,
    );

    if (person) {
      conflict_err(
        messagesEnum.conflict_err,
        'Ya existe un registro con los datos suministrados.',
      );
    }

    return await this.prisma.student.create({
      data: {
        studentRelation: {
          create: {
            ciNumber: createStudentDto.ciNumber,
            name: createStudentDto.name,
            lastName: createStudentDto.lastName,
            homeDir: createStudentDto.homeDir,
            homeParroquia: createStudentDto.homeParroquia,
            homeMunicipio: createStudentDto.homeMunicipio,
            relation: createStudentDto.relation,
          },
        },
        bornPlace: createStudentDto.bornPlace,
        bornState: createStudentDto.bornState,
        bornMunicipio: createStudentDto.bornMunicipio,
        bornParroquia: createStudentDto.bornParroquia,
        bornPais: createStudentDto.bornPais,
        bornDate: new Date(createStudentDto.bornDate),
        age: createStudentDto.age,
        sex: createStudentDto.sex,
        weight: createStudentDto.weight,
        size: createStudentDto.size,
        Lateralidad: createStudentDto.Lateralidad,
        instPro: createStudentDto.instPro,
      },
      include: {
        studentRelation: true,
      },
    });
  }

  async findAll() {
    const students = await this.prisma.student.findMany();

    if (students.length === 0)
      not_found_err(messagesEnum.not_found, 'No se encontraron registros.');

    return students;
  }

  async findOne(id: string, pass?: boolean): Promise<StudentModel> {
    const student = await this.prisma.student.findUnique({
      where: { studentCiNumber: id },
      include: {
        studentRelation: true,
        relationTable: true,
      },
    });

    if (!student && !pass)
      not_found_err(messagesEnum.not_found, 'Estudiante no encontrado.');

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);

    return await this.prisma.student.update({
      where: student,
      data: updateStudentDto,
    });
  }

  async remove(id: string) {
    const student = await this.findOne(id);

    return this.prisma.student.delete({ where: student });
  }
}
