import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres', // Database type
  host: 'localhost',
  port: 5432,
  username: 'thanhnguyen',
  password: '',
  database: 'blog2',
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entity files
  migrations: [__dirname + '/migrations/*{.ts,.js}'], // Migration files
  synchronize: false, // Disable for production
});

export default dataSource;
