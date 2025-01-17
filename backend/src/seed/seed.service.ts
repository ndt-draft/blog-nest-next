import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../routes/users/entities/user.entity';
import { Post } from '../routes/posts/entities/post.entity';
import { Category } from '../routes/categories/entities/category.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed() {
    const saltRounds = 10;
    const password = await bcrypt.hash('1234', saltRounds);

    // Seed Users
    const users = await this.userRepository.save([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password,
        role: 'admin',
      },
      {
        name: 'Author User',
        email: 'author@example.com',
        password,
        role: 'author',
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password,
        role: 'user',
      },
    ]);

    console.log('Users seeded:', users);

    // Seed Categories
    const categories = await this.categoryRepository.save([
      {
        name: 'seed cate 1',
      },
      {
        name: 'seed cate 2',
      },
    ]);

    console.log('Categories seeded:', categories);

    // Seed Posts
    const posts = await this.postRepository.save([
      {
        title: 'Introduction to PostgreSQL',
        user: users[1], // Author User
        categories,
      },
      {
        title: 'Understanding TypeORM Relationships',
        user: users[1], // Author User
        categories,
      },
    ]);

    console.log('Posts seeded:', posts);
  }
}
