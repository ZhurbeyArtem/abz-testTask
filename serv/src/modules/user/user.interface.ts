import { User } from 'src/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class IUser {
  @ApiProperty({ example: '[User]', description: 'users' })
  users: User[];

  @ApiProperty({ example: 5, description: 'count' })
  count: number;
}


export class Pagination {
  @ApiProperty({ example: 5, description: 'page' })
  page: number;

  @ApiProperty({ example: 10, description: 'limit users per page' })
  limit: number;
}