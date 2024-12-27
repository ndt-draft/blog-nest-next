import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './routes/users/users.module';
import { PostsModule } from './routes/posts/posts.module';
import { CategoriesModule } from './routes/categories/categories.module';

import { Post } from './routes/posts/entities/post.entity';
import { User } from './routes/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'thanhnguyen',
      password: '',
      database: 'blog-nest-next',
      entities: [Post, User],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    PostsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
