import { Injectable } from '@nestjs/common';
import { CustomerOrderEntity } from 'domain/entities';
import { CustomerOrderRepository } from './customer-order.repository';

@Injectable()
export class CustomerOrderService {
  constructor(
    private readonly customerOrderRepository: CustomerOrderRepository,
  ) {}

  create(orderId: number, customerId: number): Promise<CustomerOrderEntity> {
    return this.customerOrderRepository.create(orderId, customerId);
  }
}
