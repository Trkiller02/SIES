import { Module } from '@nestjs/common';
import { FichaService } from './ficha.service';
import { FichaController } from './ficha.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ficha } from './entities/ficha.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ficha]), AuthModule, UserModule],
  controllers: [FichaController],
  providers: [FichaService],
  exports: [FichaService],
})
export class FichaModule {}
