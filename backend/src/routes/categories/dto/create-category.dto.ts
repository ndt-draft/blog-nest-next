import { ApiProperty } from '@nestjs/swagger';
import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
