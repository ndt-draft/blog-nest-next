export type Comment = {
  _id: string;
  content: string;
  postId: number;
  parentId: string;
  replies: [
    {
      _id: string;
      content: string;
      postId: number;
      parentId: string;
      replies: [
        {
          _id: string;
          content: string;
          postId: number;
          parentId: string;
        }
      ];
    }
  ];
};
