import { Module } from '@nestjs/common';

import { DatabaseModule } from './database.module';
import { UsersModule } from './routes/users/users.module';
import { AuthModule } from './routes/auth/auth.module';
import { PostsModule } from './routes/posts/posts.module';
import { CategoriesModule } from './routes/categories/categories.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './routes/auth/jwt-auth.guard';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Enable authentication globally
    },
  ],
})
export class AppModule {}
