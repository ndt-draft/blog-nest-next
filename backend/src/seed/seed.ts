import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const seedService = app.get(SeedService);

  console.log('Seeding database...');
  await seedService.seed();

  console.log('Seeding completed!');
  await app.close();
}

bootstrap().catch((err) => {
  console.error('Seeding failed:', err);
});
