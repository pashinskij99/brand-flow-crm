import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async getAll() {
    await this.usersRepository.find();
  }

  async create(dto: CreateUserDto) {
    const { email, password } = dto;
    const newUser = this.usersRepository.create({ email, password });

    return this.usersRepository.save(newUser);
  }
}
