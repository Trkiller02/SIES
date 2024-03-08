import { Module } from '@nestjs/common';
//TYPEORM
import { TypeOrmModule } from '@nestjs/typeorm';
//MODULOS DE LA API
import { RelationsTableModule } from './relations-table/relations-table.module';
import { RepresentModule } from './represent/represent.module';
import { StudentModule } from './student/student.module';
import { PersonModule } from './person/person.module';
import { FichaModule } from './ficha/ficha.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { HealthInfoModule } from './health-info/health-info.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', { infer: true }),
        port: config.get<number>('DB_PORT', { infer: true }),
        database: config.get<string>('DB_DATABASE', { infer: true }),
        username: config.get<string>('DB_PROFILE', { infer: true }),
        password: config.get<string>('DB_PASSWORD', { infer: true }),
        autoLoadEntities: true,
        entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
      }),
    }),
    StudentModule,
    UserModule,
    RepresentModule,
    PersonModule,
    AuthModule,
    FichaModule,
    HealthInfoModule,
    RelationsTableModule,
    RoleModule,
    ToolsModule,
  ],
})
export class AppModule {}
