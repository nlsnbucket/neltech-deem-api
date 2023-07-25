import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { CustomerOrderEntity } from '../../domain/entities';

@Injectable()
export class CustomerOrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(customerId: number, orderId: number): Promise<CustomerOrderEntity> {
    return this.prismaService.customerOrder.create({
      data: {
        customerId,
        orderId,
      },
    });
  }
}
