import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from '../auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GetCommentsQueryDto } from './dto/get-comments-query.dto';
import { CanManageComment } from '../auth/permissions/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions/permissions.guard';

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
  findAll(@Query() query: GetCommentsQueryDto) {
    return this.commentsService.findAll(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @CanManageComment()
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @CanManageComment()
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
