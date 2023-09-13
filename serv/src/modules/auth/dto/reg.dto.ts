import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'user name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'ivan@gmail.com', description: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'ivan2005', description: 'password' })
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Min password length 8 symbols',
  })
  password: string;

  @ApiProperty({ example: 'photo.jpeg', description: 'user avatar' })
  avatar: string;
}
