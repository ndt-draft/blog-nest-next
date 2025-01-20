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
  let jwtAdminToken: string;
  let jwtAuthorToken: string;
  let jwtUserToken: string;

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
    const loginAdminResponse = await request(app.getHttpServer())
      .post('/auth/login') // Assuming your login endpoint is /auth/login
      .send({ email: 'admin@example.com', password: '1234' })
      .expect(201);
    const loginAuthorResponse = await request(app.getHttpServer())
      .post('/auth/login') // Assuming your login endpoint is /auth/login
      .send({ email: 'author@example.com', password: '1234' })
      .expect(201);
    const loginUserResponse = await request(app.getHttpServer())
      .post('/auth/login') // Assuming your login endpoint is /auth/login
      .send({ email: 'user@example.com', password: '1234' })
      .expect(201);

    jwtAdminToken = loginAdminResponse.body.access_token; // Assuming access_token is returned in the body
    jwtAuthorToken = loginAuthorResponse.body.access_token; // Assuming access_token is returned in the body
    jwtUserToken = loginUserResponse.body.access_token; // Assuming access_token is returned in the body
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

  describe('posts', () => {
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

    describe('/posts (PATCH)', () => {
      it('should patch /posts/:id by admin', async () => {
        const response = await request(app.getHttpServer())
          .patch('/posts/1')
          .set('Authorization', `Bearer ${jwtAdminToken}`)
          .send({ title: 'edit by admin' })
          .expect(200);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title', 'edit by admin');
      });
      it('should patch /posts/:id by author', async () => {
        const response = await request(app.getHttpServer())
          .patch('/posts/1')
          .set('Authorization', `Bearer ${jwtAuthorToken}`)
          .send({ title: 'edit by author' })
          .expect(200);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title', 'edit by author');
      });
      it('should not patch /posts/:id by user', async () => {
        const response = await request(app.getHttpServer())
          .patch('/posts/1')
          .set('Authorization', `Bearer ${jwtUserToken}`)
          .send({ title: 'edit by user' })
          .expect(403);

        expect(response.body).toHaveProperty(
          'message',
          'You do not have permission to access this resource',
        );
      });
    });
  });

  describe('users', () => {
    it('/users (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${jwtAdminToken}`) // Add JWT token here
        .expect(200);

      expect(response.body).toHaveLength(3);
      expect(response.body[0]).toHaveProperty('email', 'admin@example.com');
    });
  });
});
