import 'tsconfig-paths/register'; // Add this line
import { DataSource } from 'typeorm';
import { databaseConfig } from './database.config';

const dataSource = new DataSource({
  ...databaseConfig,
  synchronize: false, // Disable for production
});

export default dataSource;
