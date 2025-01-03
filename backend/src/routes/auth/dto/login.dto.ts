import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'The email address of the user',
  })
  email: string;

  @ApiProperty({
    example: '1234',
    description: 'The password of the user',
  })
  password: string;
}
