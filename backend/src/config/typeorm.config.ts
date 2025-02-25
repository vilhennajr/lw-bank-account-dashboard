import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'backend_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
});
