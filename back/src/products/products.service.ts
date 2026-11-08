import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async findAll() {
    return await this.productsRepository.findAndCount();
  }
  async findById(id: string) {
    return await this.productsRepository.find({ where: { id } });
  }
  async create(dto: CreateProductDto) {
    const { name } = dto;
    const newProduct = this.productsRepository.create({ name });

    return this.productsRepository.save(newProduct);
  }
}
