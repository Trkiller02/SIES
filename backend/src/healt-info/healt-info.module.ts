import { Module } from '@nestjs/common';
import { HealtInfoService } from './healt-info.service';
import { HealtInfoController } from './healt-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealtInfo } from './entities/healt-info.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([HealtInfo]), AuthModule],
  controllers: [HealtInfoController],
  providers: [HealtInfoService],
  exports: [HealtInfoService],
})
export class HealtInfoModule {}
