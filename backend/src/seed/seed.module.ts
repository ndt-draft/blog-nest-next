import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../routes/users/entities/user.entity';
import { Post } from '../routes/posts/entities/post.entity';
import { Category } from '../routes/categories/entities/category.entity';
import { SeedService } from './seed.service'; // Import your SeedService
import { DatabaseModule } from '../database.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Post, Category]), // Register repositories
  ],
  providers: [SeedService], // Register the SeedService
})
export class SeedModule {}
