import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { RepresentModule } from './represent/represent.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { FichaModule } from './ficha/ficha.module';
import { HealtInfoModule } from './healt-info/healt-info.module';
import { RelationsTableModule } from './relations-table/relations-table.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      database: process.env.DB_DATABASE ?? 'estest',
      username: process.env.DB_PROFILE ?? 'root',
      password: process.env.DB_PASSWORD ?? 'Password123*',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    StudentModule,
    UserModule,
    RepresentModule,
    PersonModule,
    AuthModule,
    FichaModule,
    HealtInfoModule,
    RelationsTableModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
