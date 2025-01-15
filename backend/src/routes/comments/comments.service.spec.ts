import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PostsService } from '../posts/posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

const mockModel = {
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  // Add other methods if necessary
};

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        PostsService,
        {
          provide: 'COMMENT_MODEL', // Mock Mongoose model
          useValue: mockModel,
        },
        {
          provide: 'POST_MODEL', // Mock Mongoose model
          useValue: mockModel,
        },
        {
          provide: getRepositoryToken(Post),
          useClass: Repository, // Or provide a mock object
        },
        {
          provide: getRepositoryToken(Category),
          useClass: Repository, // Or provide a mock object
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Or provide a mock object
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
