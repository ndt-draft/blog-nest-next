import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get()
  @ApiQuery({ name: 'page', required: false, default: 0 })
  @ApiQuery({ name: 'limit', required: false, default: 10 })
  findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.postsService.findAll(page, limit);
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
