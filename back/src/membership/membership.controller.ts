import { Controller, Get, Param } from '@nestjs/common';
import { MembershipService } from './membership.service';

@Controller('memberships')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.membershipService.getMembership(id);
  }
}
