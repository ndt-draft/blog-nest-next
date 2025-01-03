import { Connection } from 'mongoose';
import { PostSchema } from './post.schema';

export const postsProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Post', PostSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
