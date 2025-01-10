import { Document, ObjectId } from 'mongoose';

export interface Comment extends Document {
  readonly post_id: number;
  readonly content: string;
  readonly parent_id: object;
}
