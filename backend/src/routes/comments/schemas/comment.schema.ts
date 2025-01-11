import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema(
  {
    postId: Number,
    content: String,
    parentId: Object,
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);
