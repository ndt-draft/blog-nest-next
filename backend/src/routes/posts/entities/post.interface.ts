import { Document } from 'mongoose';

export interface Post extends Document {
  readonly post_id: number;
  readonly content: string;
}
