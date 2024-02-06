import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { HealthInfo } from './entities/health-info.entity';
import { HealthInfoController } from './health-info.controller';
import { HealthInfoService } from './health-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([HealthInfo]), AuthModule],
  controllers: [HealthInfoController],
  providers: [HealthInfoService],
  exports: [HealthInfoService],
})
export class HealthInfoModule {}
