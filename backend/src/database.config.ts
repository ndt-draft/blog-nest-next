import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const migrationConfig: DataSourceOptions = {
  // Common config
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'thanhnguyen',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'blog-nest-next',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'], // Migration files
  // Overrides
  synchronize: false, // disable in prod
  logging: false, // disable in prod
  ssl: {
    rejectUnauthorized: false,
  },
};

export const getDatabaseConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  // Common config
  type: 'postgres',
  host: configService.get<string>('database.host'),
  port: configService.get<number>('database.port'),
  username: configService.get<string>('database.user'),
  password: configService.get<string>('database.password'),
  database: configService.get<string>('database.name'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'], // Migration files
  // Overrides
  synchronize: configService.get<boolean>('database.synchronize'), // disable in prod
  logging: configService.get<boolean>('database.logging'), // disable in prod
  ssl: {
    rejectUnauthorized: false,
  },
});
