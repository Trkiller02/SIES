import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports: [PrismaModule, PersonModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
