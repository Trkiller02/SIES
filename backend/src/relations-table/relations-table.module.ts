import { Module } from '@nestjs/common';
import { RelationsTableService } from './relations-table.service';
import { RelationsTableController } from './relations-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationsTable } from './entities/relations-table.entity';
import { RepresentModule } from 'src/represent/represent.module';
import { StudentModule } from 'src/student/student.module';
import { HealtInfoModule } from 'src/healt-info/healt-info.module';
import { FichaModule } from 'src/ficha/ficha.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RelationsTable]),
    RepresentModule,
    StudentModule,
    HealtInfoModule,
    FichaModule,
  ],
  controllers: [RelationsTableController],
  providers: [RelationsTableService],
})
export class RelationsTableModule {}
