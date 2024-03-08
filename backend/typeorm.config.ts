import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({
  path: '.env',
});

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_PROFILE,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/src/**/*.entity{.ts, .js}'],
  migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
});
