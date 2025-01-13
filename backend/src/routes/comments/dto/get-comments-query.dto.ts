import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCommentsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  postId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;

  @IsOptional()
  @Type(() => Number) // Transform query param to number
  @IsInt()
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @Type(() => Number) // Transform query param to number
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
