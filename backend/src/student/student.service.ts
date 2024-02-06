import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//DTOs
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
//SERVICE
import { PersonService } from 'src/person/person.service';
//ERROR HANDLER
import { not_found_err } from 'src/utils/handlerErrors';
//MESSAGES
import { messagesEnum } from 'src/utils/handlerMsg';
//ENTITY
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    private readonly personService: PersonService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const person = await this.personService.create({ ...createStudentDto });

    return await this.studentRepo.save({
      person_id: person,
      ...createStudentDto,
    });
  }

  async findAll() {
    const students = await this.studentRepo.find();

    if (students.length === 0)
      not_found_err(messagesEnum.not_found, 'No se encontraron registros.');

    return students;
  }

  async findOne(
    id: string,
    deleted: boolean = false,
    pass?: boolean,
  ): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: {
        person_id: {
          ci_number: id,
        },
      },
      withDeleted: deleted,
    });

    if (!student && !pass)
      not_found_err(messagesEnum.not_found, 'Estudiante no encontrado.');

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);

    return await this.studentRepo.update(student, updateStudentDto);
  }

  async remove(id: string) {
    const student = await this.findOne(id);

    return this.studentRepo.delete(student);
  }
}
