import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RepresentModule } from './represent/represent.module';
import { NotasModule } from './notas/notas.module';
import { PersonModule } from './person/person.module';
import { GeneratePdfModule } from './generate-pdf/generate-pdf.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, StudentModule, UserModule, PrismaModule, RepresentModule, NotasModule, PersonModule, GeneratePdfModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
