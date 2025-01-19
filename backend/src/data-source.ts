import 'tsconfig-paths/register'; // Add this line
import { DataSource } from 'typeorm';
import { migrationConfig } from './database.config';

const dataSource = new DataSource({
  ...migrationConfig,
  synchronize: false, // Disable for production
});

export default dataSource;
