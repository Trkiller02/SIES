import { Module } from '@nestjs/common';
//TYPEORM
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
//MODULOS DE LA API
import { RelationsTableModule } from './relations-table/relations-table.module';
import { HealtInfoModule } from './healt-info/healt-info.module';
import { RepresentModule } from './represent/represent.module';
import { StudentModule } from './student/student.module';
import { PersonModule } from './person/person.module';
import { FichaModule } from './ficha/ficha.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST', { infer: true }),
          port: config.get<number>('DB_PORT', { infer: true }),
          database: config.get<string>('DB_DATABASE', { infer: true }),
          username: config.get<string>('DB_PROFILE', { infer: true }),
          password: config.get<string>('DB_PASSWORD', { infer: true }),
          autoLoadEntities: true,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
    }),
    StudentModule,
    UserModule,
    RepresentModule,
    PersonModule,
    AuthModule,
    FichaModule,
    HealtInfoModule,
    RelationsTableModule,
    RoleModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
