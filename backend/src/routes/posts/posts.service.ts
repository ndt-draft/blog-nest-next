import {
  Body,
  Inject,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, In, Like, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/entities/user.entity';
import { CreatePostResponseDto } from './dto/create-post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { Post as PostMongo } from './schemas/post.interface';
import { PostsResponseDto } from './dto/posts-response.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @Inject('POST_MODEL')
    private postModel: Model<PostMongo>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    category: number,
    s: string,
  ): Promise<PostsResponseDto> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    // Filter by category if provided
    if (category && category > 0) {
      queryBuilder
        .leftJoinAndSelect('post.categories', 'category') // Join the categories relation
        .where('category.id = :category', { category }); // Filter posts by category ID
    }

    // Filter by title if search string (s) is provided
    if (s) {
      queryBuilder.andWhere('post.title LIKE :title', { title: `%${s}%` });
    }

    // Apply pagination
    queryBuilder.skip(page * limit).take(limit);

    // Order by new to old
    queryBuilder.orderBy('post.created_at', 'DESC');

    // Execute the query to get posts
    const [rawPosts, total] = await queryBuilder.getManyAndCount();

    // Get posts with full relational data
    const posts = await this.postRepository.find({
      where: {
        id: In(rawPosts.map((post) => post.id)),
      },
      relations: {
        user: true,
        categories: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
      order: {
        created_at: 'DESC',
      },
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
    let categories = [];
    if (createPostDto.categories) {
      categories = await this.categoryRepository.find({
        where: {
          id: In(createPostDto.categories),
        },
      });
    }
    if (!user) {
      throw new NotFoundException(`User with ID ${req.user.id} not found`);
    }
    const post = this.postRepository.create({
      ...createPostDto,
      user,
      categories,
    });

    // Save the post
    const savedPost = await this.postRepository.save(post);

    const postMongo = new this.postModel({
      post_id: savedPost.id,
      content: createPostDto.content,
    });
    await postMongo.save();

    return {
      ...savedPost,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      content: postMongo.content,
    };
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        categories: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
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
    const post = await this.getPostById(id);
    const { content, categories: categoryIds, ...postData } = updatePostDto;

    let categories: Category[] = [];

    if (categoryIds) {
      categories = await this.categoryRepository.find({
        where: {
          id: In(categoryIds),
        },
      });
    }

    const updateData: Partial<Post> = {
      ...postData,
      updated_at: new Date(),
    };

    if (categoryIds) {
      updateData.categories = categories;
    }

    const updatedPost = await this.postRepository.save({ ...updateData, id });

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
      ...updatedPost,
      user: post.user,
      content: postMongo.content,
    };
  }

  async remove(id: number): Promise<void> {
    const post = await this.getPostById(id);
    await this.postRepository.remove(post);
    await this.postModel.deleteOne({ post_id: id });
  }
}
