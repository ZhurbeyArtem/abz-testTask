import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/reg.dto';
import { LogDto } from './dto/log.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/entity/user.entity';
import { IAuth } from './auth.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registration user' })
  @ApiResponse({ status: 200, type: IAuth })
  @Post('/reg')
  @UseInterceptors(FileInterceptor('avatar'))
  reg(@Body() dto: CreateUserDto, @UploadedFile() avatar): Promise<IAuth> {
    console.log(dto)
    console.log(avatar)

    return this.authService.registration(dto, avatar);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/log')
  log(@Body() dto: LogDto): Promise<IAuth> {
    return this.authService.login(dto);
  }
}
