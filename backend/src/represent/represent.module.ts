import { Module } from '@nestjs/common';
import { RepresentService } from './represent.service';
import { RepresentController } from './represent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Represent } from './entities/represent.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([Represent]), PersonModule, AuthModule],
  controllers: [RepresentController],
  providers: [RepresentService],
  exports: [RepresentService],
})
export class RepresentModule {}
