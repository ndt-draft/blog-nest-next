import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  post_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsOptional()
  @ApiProperty()
  parent_id: string;
}
