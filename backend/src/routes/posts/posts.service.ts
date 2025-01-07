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
import { Post as PostMongo } from './schemas/post.interface';
import { PostsResponseDto } from './dto/posts-response.dto';

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

  async findAll(page: number, limit: number): Promise<PostsResponseDto> {
    const [posts, total] = await this.postRepository.findAndCount({
      skip: page * limit,
      take: limit,
    });

    const contents = await this.postModel.find({
      post_id: { $in: posts.map((post) => post.id) },
    });

    return {
      posts: posts.map((post) => ({
        ...post,
        content: contents.find((c) => c.post_id === post.id)?.content || null,
      })),
      pagination: {
        limit,
        page,
        total,
      },
    };
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
      content: postMongo?.content || null,
    };
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<CreatePostResponseDto> {
    await this.getPostById(id);

    const { content, ...postData } = updatePostDto;

    const updatedPost = await this.postRepository
      .createQueryBuilder()
      .update(Post)
      .set({
        ...postData,
        updated_at: new Date(),
      })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    const postMongo = await this.postModel.findOneAndUpdate(
      { post_id: id },
      {
        content,
      },
      {
        returnDocument: 'after',
      },
    );

    return {
      ...updatedPost.raw[0],
      content: postMongo.content,
    };
  }

  async remove(id: number): Promise<void> {
    const post = await this.getPostById(id);
    await this.postRepository.remove(post);
    await this.postModel.deleteOne({ post_id: id });
  }
}
