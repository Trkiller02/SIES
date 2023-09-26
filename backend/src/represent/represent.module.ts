import { Module } from '@nestjs/common';
import { RepresentService } from './represent.service';
import { RepresentController } from './represent.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RepresentController],
  providers: [RepresentService],
})
export class RepresentModule {}
