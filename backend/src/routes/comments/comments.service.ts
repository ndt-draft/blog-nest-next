import { Inject, Injectable, NotFoundException, Request } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import mongoose, { Model } from 'mongoose';
import { Comment } from './schemas/comment.interface';
import { CommentsResponseDto } from './dto/comments-response.dto';
import { nestedCommentsPipelines } from './pipelines/nested-comments.pipelines';
import { PostsService } from '../posts/posts.service';
import { GetCommentsQueryDto } from './dto/get-comments-query.dto';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_MODEL')
    private commentModel: Model<Comment>,
    private postsService: PostsService,
  ) {}

  async getCommentById(id: string): Promise<Comment> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid comment or parent id');
    }

    const comment = await this.commentModel.findById(
      new mongoose.Types.ObjectId(id),
    );

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async create(
    createCommentDto: CreateCommentDto,
    @Request() req,
  ): Promise<Comment> {
    await this.postsService.getPostById(createCommentDto.postId);

    const { parentId } = createCommentDto;

    if (parentId) {
      await this.getCommentById(parentId);
    }

    const comment = await this.commentModel.create({
      ...createCommentDto,
      userId: req.user.id,
      parentId: parentId ? new mongoose.Types.ObjectId(parentId) : null,
    });
    return comment;
  }

  async findAll(query: GetCommentsQueryDto): Promise<CommentsResponseDto> {
    const { page, limit, postId, userId } = query;

    // Ensure the limit is positive
    if (limit <= 0) {
      throw new Error('The limit must be positive');
    }

    // will support parentId for loading nested replies later
    const matchQuery: Record<string, any> = { parentId: null };
    if (postId > 0) {
      await this.postsService.getPostById(postId);
      matchQuery.postId = postId;
    }
    if (userId > 0) {
      matchQuery.userId = userId;
    }

    const data = await this.commentModel.aggregate([
      {
        // Match root comments (parentId is null)
        $match: matchQuery,
      },
      ...nestedCommentsPipelines,
      {
        // Sort the root comments by createdAt
        $sort: { createdAt: -1 },
      },
      {
        // Add the $facet stage to calculate both data and total count
        $facet: {
          comments: [
            { $skip: page * limit }, // Pagination: Skip
            { $limit: limit }, // Pagination: Limit
          ],
          totalCount: [
            { $count: 'count' }, // Count total number of matching documents
          ],
        },
      },
      {
        // Simplify the output structure
        $project: {
          comments: 1,
          totalCount: { $arrayElemAt: ['$totalCount.count', 0] }, // Extract total count
        },
      },
    ]);

    return {
      comments: data?.[0]?.comments,
      pagination: {
        page,
        limit,
        total: data?.[0]?.totalCount,
      },
    };
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.getCommentById(id);

    const data = await this.commentModel.aggregate([
      {
        // Match root comments (parentId is null)
        $match: { _id: comment._id },
      },
      ...nestedCommentsPipelines,
    ]);

    return data[0];
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    await this.getCommentById(id);

    const comment = await this.commentModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      updateCommentDto,
      { returnDocument: 'after' },
    );

    return comment;
  }

  async remove(id: string): Promise<void> {
    await this.getCommentById(id);
    await this.commentModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  }
}
