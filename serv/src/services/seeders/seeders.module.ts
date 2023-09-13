import { Module, forwardRef } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  providers: [SeedersService],
  exports: [SeedersService],
  imports: [forwardRef(() => AuthModule)],
})
export class SeedersModule {}
