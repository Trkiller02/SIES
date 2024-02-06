import { Module } from '@nestjs/common';
import { RelationsTableService } from './relations-table.service';
import { RelationsTableController } from './relations-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationsTable } from './entities/relations-table.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RelationsTable]), AuthModule],
  controllers: [RelationsTableController],
  providers: [RelationsTableService],
})
export class RelationsTableModule {}
