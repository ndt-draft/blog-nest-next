import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PostsService } from 'src/routes/posts/posts.service';

@Injectable()
export class EditPostGuard implements CanActivate {
  constructor(private postsService: PostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const postId = request.params.id;

    // Check if the post exists
    const post = await this.postsService.findOne(postId);

    // Check if the user is the admin or the original author
    const isAdmin = user.role === 'admin';
    const isAuthor = post.user_id === user.id;

    if (!isAdmin && !isAuthor) {
      throw new ForbiddenException(
        'You do not have permission to edit this post',
      );
    }

    return true;
  }
}
