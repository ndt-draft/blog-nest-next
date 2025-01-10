import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import mongoose, { Model } from 'mongoose';
import { Comment } from './schemas/comment.interface';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_MODEL')
    private commentModel: Model<Comment>,
  ) {}

  async getCommentById(id: string): Promise<Comment> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid id');
    }

    const comment = await this.commentModel.findById(
      new mongoose.Types.ObjectId(id),
    );

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { parent_id } = createCommentDto;

    if (parent_id) {
      await this.getCommentById(parent_id);
    }

    const comment = await this.commentModel.create({
      ...createCommentDto,
      parent_id: parent_id ? new mongoose.Types.ObjectId(parent_id) : null,
    });
    return comment;
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentModel.find({
      parent_id: null,
    });

    return comments;
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.getCommentById(id);
    return comment;
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
