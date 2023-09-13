import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogDto {
  @ApiProperty({ example: 'ivan@gmail.com', description: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'ivan2005', description: 'password' })
  @IsNotEmpty()
  password: string;
}
