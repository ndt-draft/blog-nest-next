import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Public } from '../auth/jwt/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions/permissions.guard';
import { CanCreatePost } from '../auth/permissions/permissions.decorator';
import { EditPostGuard } from '../auth/permissions/edit-post.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @CanCreatePost()
  @ApiBearerAuth()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(createPostDto, req);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard, EditPostGuard)
  @CanCreatePost()
  @ApiBody({ type: UpdatePostDto })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard, EditPostGuard)
  @CanCreatePost()
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
