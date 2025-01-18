import { DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
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
  synchronize: true, // disable in prod
  logging: true, // disable in prod
};
