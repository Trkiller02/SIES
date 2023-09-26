import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import PDFDocument from 'pdfkit';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}
  async create(createStudentDto: CreateStudentDto) {
    try {
      const res = await fetch(`/person/${createStudentDto.ciNumber}`);
      const { id } = await res.json();

      return this.prisma.student.create({
        data: {
          studentRelation: {
            connectOrCreate: {
              where: { ciNumber: id },
              create: {
                ciNumber: createStudentDto.ciNumber,
                firstName: createStudentDto.firstName,
                secondName: createStudentDto.secondName,
                firstLastName: createStudentDto.firstLastName,
                secondLastName: createStudentDto.secondLastName,
                homeDir: createStudentDto.homeDir,
                homeParroquia: createStudentDto.homeParroquia,
                homeMunicipio: createStudentDto.homeMunicipio,
              },
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
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return this.prisma.student.findMany();
  }

  async findOne(id: string) {
    return this.prisma.student.findUnique({
      where: { studentCiNumber: id },
      include: {
        relationTable: true,
      },
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { studentCiNumber: id },
      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
