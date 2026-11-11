import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { BusinessModule } from '../business/business.module';
import { MembershipModule } from '../membership/membership.module';

@Module({
  imports: [UsersModule, BusinessModule, MembershipModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
