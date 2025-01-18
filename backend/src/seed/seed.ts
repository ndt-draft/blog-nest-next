import { NestFactory } from '@nestjs/core';
import { SeedService } from './seed.service';
import { AppModule } from '../app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // Enable shutdown hooks
  app.enableShutdownHooks();

  const seedService = app.get(SeedService);

  console.log('Seeding database...');
  await seedService.seed();

  console.log('Seeding completed!');
  await app.close();
  process.exit(0); // Ensure the process exits
}

bootstrap().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1); // Exit with error
});
