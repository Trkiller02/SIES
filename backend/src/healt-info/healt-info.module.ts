import { Module } from '@nestjs/common';
import { HealtInfoService } from './healt-info.service';
import { HealtInfoController } from './healt-info.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HealtInfoController],
  providers: [HealtInfoService],
})
export class HealtInfoModule {}
