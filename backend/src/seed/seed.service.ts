import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../routes/users/entities/user.entity';
import { Post } from '../routes/posts/entities/post.entity';
import { Category } from '../routes/categories/entities/category.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed() {
    // Seed Users
    const users = await this.userRepository.save([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        name: 'Author User',
        email: 'author@example.com',
        password: 'author123',
        role: 'author',
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: 'user123',
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
        categories: [categories[0]],
      },
      {
        title: 'Understanding TypeORM Relationships',
        user: users[1], // Author User
        categories: [categories[1]],
      },
    ]);

    console.log('Posts seeded:', posts);
  }
}
