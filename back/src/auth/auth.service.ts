import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { DataSource } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import * as bcrypt from 'bcryptjs';
import { Business } from '../business/entities/business.entity';
import {
  Memberships,
  ROLE,
  STATUS,
} from '../membership/entities/membership.entity';
import { MembershipService } from '../membership/membership.service';

const saltOrRounds: number = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly membeshipService: MembershipService,
  ) {}

  async register(dto: RegisterDto) {
    const {
      brandName,
      email,
      firstName,
      lastName,
      password,
      // privacyPolicy,
      // termsAndConditions,
    } = dto;

    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        const user = await transactionalEntityManager.findOneBy(Users, {
          email,
        });

        if (user) {
          throw new UnauthorizedException(
            `User is already created! ${user.id}`,
          );
        }

        const newUserInstance = transactionalEntityManager.create(Users, {
          firstName,
          lastName,
          email,
          password_hash: hashPassword,
        });
        const savedUser = await transactionalEntityManager.save(
          Users,
          newUserInstance,
        );

        const newBusinesInstance = transactionalEntityManager.create(Business, {
          name: brandName,
        });
        const savedBusiness = await transactionalEntityManager.save(
          Business,
          newBusinesInstance,
        );

        const newMembershipInstance = transactionalEntityManager.create(
          Memberships,
          {
            user_id: savedUser.id,
            business_id: savedBusiness.id,
            role: ROLE.OWNER,
            status: STATUS.ACTIVE,
          },
        );
        const savedMembership = await transactionalEntityManager.save(
          Memberships,
          newMembershipInstance,
        );

        return {
          user: savedUser,
          business: savedBusiness,
          membeship: savedMembership,
        };
      },
    );
  }
}
