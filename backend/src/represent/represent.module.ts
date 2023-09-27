import { Module } from '@nestjs/common';
import { RepresentService } from './represent.service';
import { RepresentController } from './represent.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { PersonModule } from '../../src/person/person.module';

@Module({
  imports: [PrismaModule, PersonModule],
  controllers: [RepresentController],
  providers: [RepresentService],
})
export class RepresentModule {}
