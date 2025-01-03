import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  post_id: Number,
  content: String,
});
