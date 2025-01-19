export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASS || '',
    name: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE === '1',
    logging: process.env.DB_LOGGING === '1',
  },
});
