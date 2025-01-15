import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PostsService } from '../posts/posts.service';
import { Category } from '../categories/entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { PostsModule } from '../posts/posts.module';
import { User } from '../users/entities/user.entity';

const mockModel = {
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  // Add other methods if necessary
};

describe('CommentsController', () => {
  let controller: CommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        PostsService,
        {
          provide: 'POST_MODEL', // Mock Mongoose model
          useValue: mockModel,
        },
        {
          provide: 'COMMENT_MODEL', // Mock Mongoose model
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

    controller = module.get<CommentsController>(CommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
