import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { UsersModule } from './routes/users/users.module';
import { PostsModule } from './routes/posts/posts.module';
import { CategoriesModule } from './routes/categories/categories.module';

@Module({
  imports: [DatabaseModule, UsersModule, PostsModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
