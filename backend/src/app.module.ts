import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { UsersModule } from './routes/users/users.module';
import { AuthModule } from './routes/auth/auth.module';
import { PostsModule } from './routes/posts/posts.module';
import { CategoriesModule } from './routes/categories/categories.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './routes/auth/jwt/jwt-auth.guard';
import { CommentsModule } from './routes/comments/comments.module';
import { SeedService } from './seed/seed.service';
import { User } from './routes/users/entities/user.entity';
import { Post } from './routes/posts/entities/post.entity';
import { Category } from './routes/categories/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`, // Default to .env.local
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    CommentsModule,
    TypeOrmModule.forFeature([User, Post, Category]), // Register entities here
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Enable authentication globally
    },
    SeedService,
  ],
})
export class AppModule {}
