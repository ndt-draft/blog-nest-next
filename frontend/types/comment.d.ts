export type Comment = {
  _id: string;
  content: string;
  replies: [
    {
      _id: string;
      content: string;
      replies: [
        {
          _id: string;
          content: string;
        }
      ];
    }
  ];
};
