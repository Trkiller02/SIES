import { Module } from '@nestjs/common';
import { FichaService } from './ficha.service';
import { FichaController } from './ficha.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FichaController],
  providers: [FichaService],
})
export class FichaModule {}
