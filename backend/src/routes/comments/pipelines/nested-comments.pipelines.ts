export const nestedCommentsPipelines = [
  {
    // Lookup first-level replies based on parentId
    $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'parentId',
      as: 'replies',
    },
  },
  {
    // Unwind the first-level replies to process them individually
    $unwind: {
      path: '$replies',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    // Lookup second-level replies (replies to replies) based on parentId
    $lookup: {
      from: 'comments',
      localField: 'replies._id',
      foreignField: 'parentId',
      as: 'replies.replies',
    },
  },
  {
    // Group back the first-level replies into an array
    $group: {
      _id: '$_id',
      postId: { $first: '$postId' },
      content: { $first: '$content' },
      parentId: { $first: '$parentId' },
      createdAt: { $first: '$createdAt' },
      updatedAt: { $first: '$updatedAt' },
      replies: {
        $push: {
          _id: '$replies._id',
          postId: '$replies.postId',
          content: '$replies.content',
          parentId: '$replies.parentId',
          createdAt: '$replies.createdAt',
          updatedAt: '$replies.updatedAt',
          replies: '$replies.replies', // Second-level replies remain as is
        },
      },
    },
  },
  {
    // Optionally, format the output
    $project: {
      _id: 1,
      postId: 1,
      content: 1,
      parentId: 1,
      createdAt: 1,
      updatedAt: 1,
      replies: {
        $filter: {
          input: '$replies',
          as: 'reply',
          cond: {
            $eq: ['$$reply.parentId', '$_id'], // Ensure reply.parentId matches root comment's _id
          },
        },
      },
    },
  },
];
