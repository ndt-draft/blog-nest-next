import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.commentsService.create(createCommentDto, req);
  }

  @Public()
  @Get()
  @ApiQuery({ name: 'page', required: false, default: 0 })
  @ApiQuery({ name: 'limit', required: false, default: 10 })
  @ApiQuery({ name: 'postId', required: false })
  @ApiQuery({ name: 'userId', required: false })
  findAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('postId', new DefaultValuePipe(0), ParseIntPipe) postId: number,
    @Query('userId', new DefaultValuePipe(0), ParseIntPipe) userId: number,
  ) {
    return this.commentsService.findAll(page, limit, postId, userId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
