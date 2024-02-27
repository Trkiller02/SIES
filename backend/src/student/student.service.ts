import { IsNull, Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//DTOs
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
//SERVICE
import { PersonService } from 'src/person/person.service';
//ERROR HANDLER
import { bad_req_err, not_found_err } from 'src/utils/handlerErrors';
//MESSAGES
import { msgEnum } from 'src/utils/handlerMsg';
//ENTITY
import { Student } from './entities/student.entity';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    private readonly personService: PersonService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const person = await this.personService.create(createStudentDto.person_id);

    return await this.studentRepo.save({
      person_id: person,
      ...createStudentDto,
    });
  }

  async findAll() {
    const students = await this.studentRepo.find();

    if (students.length === 0)
      not_found_err(msgEnum.not_found, 'No se encontraron registros.');

    return students;
  }

  async findOne(
    id: string,
    deleted: boolean = false,
    pass?: boolean,
  ): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: [
        { id: id },
        {
          person_id: {
            ci_number: id,
          },
        },
      ],
      withDeleted: deleted,
    });

    if (!student && !pass)
      not_found_err(msgEnum.not_found, 'Estudiante no encontrado.');

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);

    if (updateStudentDto.person_id) {
      await this.personService.update(
        (student.person_id as Person).ci_number,
        updateStudentDto.person_id,
      );
    }

    const res = await this.studentRepo.update(
      { id: student.id },
      { ...updateStudentDto, person_id: updateStudentDto.person_id.ci_number },
    );

    if (res.affected === 0) bad_req_err(msgEnum.bad_req_err, res.raw);

    return res;
  }

  async remove(id: string) {
    const student = await this.findOne(id);

    await this.personService.remove((student.person_id as Person).ci_number);

    const res = await this.studentRepo.softDelete({ id: student.id });

    if (res.affected === 0) bad_req_err(msgEnum.bad_req_err, res.raw);

    return res;
  }
}
