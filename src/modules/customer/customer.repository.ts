import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { CreateCustomerDto } from '../../domain/dtos';
import { CustomerEntity } from '../../domain/entities';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    return this.prismaService.customer.create({
      data: {
        ...createCustomerDto,
        deletedAt: null,
      },
    });
  }
}
