import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { SeedService } from '../src/seed/seed.service';

describe('PostsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let seedService: SeedService;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get DataSource and Repositories
    dataSource = moduleFixture.get(DataSource);
    seedService = moduleFixture.get(SeedService);

    // Seed database and get a JWT token
    await dataSource.synchronize(true);
    await seedService.seed();

    // Obtain JWT token, you may replace this part with your own login endpoint
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login') // Assuming your login endpoint is /auth/login
      .send({ email: 'admin@example.com', password: '1234' })
      .expect(201);

    jwtToken = loginResponse.body.access_token; // Assuming access_token is returned in the body
  });

  beforeEach(async () => {
    // Clean database
    await dataSource.synchronize(true);

    // Seed database
    await seedService.seed();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/posts (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/posts')
      .expect(200);

    expect(response.body.posts).toHaveLength(2);
    expect(response.body.posts[0]).toHaveProperty(
      'title',
      'Understanding TypeORM Relationships',
    );
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${jwtToken}`) // Add JWT token here
      .expect(200);

    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty('email', 'admin@example.com');
  });
});
