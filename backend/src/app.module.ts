import { Module } from '@nestjs/common';
/* import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { RepresentModule } from './represent/represent.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module'; */
import { FichaModule } from './ficha/ficha.module';
/* import { HealtInfoModule } from './healt-info/healt-info.module';
import { RelationsTableModule } from './relations-table/relations-table.module'; */
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Ficha } from './ficha/entities/ficha.entity';
import { User } from './user/entities/user.entity';
import { HealtInfo } from './healt-info/entities/healt-info.entity';
import { RelationsTable } from './relations-table/entities/relations-table.entity';
import { Person } from './person/entities/person.entity';
import { Represent } from './represent/entities/represent.entity';
import { Student } from './student/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_PROFILE ?? 'root',
      password: process.env.DB_PASSWORD ?? '',
      entities: [
        Ficha,
        HealtInfo,
        Person,
        RelationsTable,
        Represent,
        Student,
        User,
      ],
      synchronize: true,
    }),
    //StudentModule,
    //UserModule,
    //RepresentModule,
    //PersonModule,
    //AuthModule,
    FichaModule,
    //HealtInfoModule,
    //RelationsTableModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
