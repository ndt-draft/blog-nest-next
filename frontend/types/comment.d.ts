export type Comment = {
  id: string;
  content: string;
  replies: [
    {
      id: string;
      content: string;
      replies: [
        {
          id: string;
          content: string;
        }
      ];
    }
  ];
};
