import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto) {
    return await this.prisma.person.create({
      data: createPersonDto,
    });
  }

  async findAll() {
    return await this.prisma.person.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.person.findFirstOrThrow({
      where: { ciNumber: id },
    });
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    return await this.prisma.person.update({
      where: { ciNumber: id },
      data: updatePersonDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.person.delete({
      where: { ciNumber: id },
    });
  }
}
