import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CustomerOrderEntity } from 'src/domain/entities';

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
