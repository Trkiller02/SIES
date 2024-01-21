import { Module } from '@nestjs/common';
import { HealtInfoService } from './healt-info.service';
import { HealtInfoController } from './healt-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealtInfo } from './entities/healt-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HealtInfo])],
  controllers: [HealtInfoController],
  providers: [HealtInfoService],
})
export class HealtInfoModule {}
