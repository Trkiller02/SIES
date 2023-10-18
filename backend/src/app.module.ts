import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RepresentModule } from './represent/represent.module';
import { NotasModule } from './notas/notas.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { FichaModule } from './ficha/ficha.module';
import { HealtInfoModule } from './healt-info/healt-info.module';
import { RelationsTableModule } from './relations-table/relations-table.module';

@Module({
  imports: [
    StudentModule,
    UserModule,
    PrismaModule,
    RepresentModule,
    NotasModule,
    PersonModule,
    AuthModule,
    FichaModule,
    HealtInfoModule,
    RelationsTableModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
