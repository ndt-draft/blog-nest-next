import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository, // Or provide a mock object
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
