import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  post_id: Number,
  content: String,
  parent_id: Object,
});
