import { Document, ObjectId } from 'mongoose';

export interface Comment extends Document {
  readonly postId: number;
  readonly content: string;
  readonly parentId: object;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
