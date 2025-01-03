import {
  Body,
  Inject,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/entities/user.entity';
import { CreatePostResponseDto } from './dto/create-post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { Post as PostMongo } from './entities/post.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('POST_MODEL')
    private postModel: Model<PostMongo>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req,
  ): Promise<CreatePostResponseDto> {
    const user = await this.userRepository.findOneBy({
      id: req.user.id,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${req.user.id} not found`);
    }
    const post = this.postRepository.create({
      ...createPostDto,
      user,
    });

    // Save the post
    const savedPost = await this.postRepository.save(post);
    const { user: postUser, ...postResponse } = savedPost;

    const postMongo = new this.postModel({
      post_id: savedPost.id,
      content: createPostDto.content,
    });
    await postMongo.save();

    return {
      ...postResponse,
      content: postMongo.content,
    };
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async findOne(id: number): Promise<CreatePostResponseDto> {
    const post = await this.getPostById(id);

    const postMongo = await this.postModel.findOne({ post_id: id });
    return {
      ...post,
      content: postMongo.content,
    };
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.findOne(id);

    const updatedPost = await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
        ...updatePostDto,
        updated_at: new Date(),
      })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return updatedPost.raw[0];
  }

  async remove(id: number): Promise<void> {
    const post = await this.getPostById(id);
    await this.postRepository.remove(post);
  }
}
