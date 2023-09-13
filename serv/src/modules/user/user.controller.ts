import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/services/guards/jwt.auth.guard';
import { ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { IUser, Pagination } from './user.interface';
import { SeedersService } from 'src/services/seeders/seeders.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private seedService: SeedersService,
  ) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: IUser })
  @ApiQuery({ example: '2', description: 'page' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() data: Pagination): Promise<IUser> {
    return this.userService.getAll(data);
  }

  @ApiOperation({ summary: 'Generate 45 users' })
  @ApiResponse({ status: 200, type: 'Success' })
  @Post('/generate')
  generateUsers(): Promise<string> {
    return this.seedService.generate();
  }
}
