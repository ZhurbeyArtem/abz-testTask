import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from 'src/services/file/file.module';
import { SeedersModule } from 'src/services/seeders/seeders.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => SeedersModule),
    FileModule,
  ],
})
export class UserModule {}
