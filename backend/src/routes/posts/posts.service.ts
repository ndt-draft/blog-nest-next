import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  findAll(): string {
    return 'get all posts';
  }
}
