import { Module } from '@nestjs/common';
import { RelationsTableService } from './relations-table.service';
import { RelationsTableController } from './relations-table.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RelationsTableController],
  providers: [RelationsTableService],
})
export class RelationsTableModule {}
