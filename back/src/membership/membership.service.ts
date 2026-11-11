import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memberships } from './entities/membership.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Memberships)
    private readonly membershipRepository: Repository<Memberships>,
  ) {}

  async getMembership(id: string) {
    return await this.membershipRepository.find({
      where: { id },
      relations: { user: true, business: true },
    });
  }
}
