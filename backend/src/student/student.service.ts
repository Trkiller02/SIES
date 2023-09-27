import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonService } from 'src/person/person.service';
import PDFDocument from 'pdfkit';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly personService: PersonService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.findOne(createStudentDto.ciNumber, true);

    if (student) throw new ConflictException('El estudiante ya existe');

    const person = await this.personService.findOne(
      createStudentDto.ciNumber,
      true,
    );

    if (person) {
      return this.prisma.student.create({
        data: {
          studentRelation: {
            connect: { ciNumber: person.ciNumber },
          },
          bornPlace: createStudentDto.bornPlace,
          bornState: createStudentDto.bornState,
          bornMunicipio: createStudentDto.bornMunicipio,
          bornParroquia: createStudentDto.bornParroquia,
          bornPais: createStudentDto.bornPais,
          bornDate: createStudentDto.bornDate,
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

    return this.prisma.student.create({
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
        bornDate: createStudentDto.bornDate,
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
      throw new NotFoundException('No se encontraron registros');

    return students;
  }

  async findOne(id: string, pass?: boolean) {
    const user = this.prisma.student.findUnique({
      where: { studentCiNumber: id },
      include: {
        relationTable: true,
      },
    });

    if (!user && !pass) throw new NotFoundException('Estudiante no encontrado');

    return user;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.prisma.student.findUnique({
      where: { studentCiNumber: id },
      select: { studentCiNumber: true },
    });

    if (!student) throw new NotFoundException('Estudiante no encontrado');

    return await this.prisma.student.update({
      where: student,
      data: updateStudentDto,
    });
  }

  async remove(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { studentCiNumber: id },
      select: { studentCiNumber: true },
    });

    if (!student) throw new NotFoundException('Estudiante no encontrado');

    return this.prisma.student.delete({ where: student });
  }
}
