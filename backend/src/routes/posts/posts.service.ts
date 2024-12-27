import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/entities/user.entity';
import { CreatePostResponseDto } from './dto/create-post-response.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<CreatePostResponseDto> {
    const user = await this.userRepository.findOneBy({
      id: createPostDto.user_id,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createPostDto.user_id} not found`,
      );
    }
    const post = this.postRepository.create({
      ...createPostDto,
      user,
    });

    // Save the post
    const savedPost = await this.postRepository.save(post);

    return {
      id: savedPost.id,
      title: savedPost.title,
      categories: savedPost.categories,
      user_id: user.id,
    };
  }
}
