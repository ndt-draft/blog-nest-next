import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  findAll(): string {
    return `all categories`;
  }
}
