import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../routes/users/entities/user.entity';
import { Post } from '../routes/posts/entities/post.entity';
import { Category } from '../routes/categories/entities/category.entity';
import { SeedService } from './seed.service'; // Import your SeedService

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Adjust for your DB type
      host: 'localhost',
      port: 5432,
      username: 'thanhnguyen',
      password: '',
      database: 'testdb',
      entities: [User, Post, Category], // Your entities
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Post, Category]), // Register repositories
  ],
  providers: [SeedService], // Register the SeedService
})
export class SeedModule {}
