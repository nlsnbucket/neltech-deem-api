import { Injectable } from '@nestjs/common';
import { CustomerOrderRepository } from './customer-order.repository';
import { CustomerOrderEntity } from '../../domain/entities';

@Injectable()
export class CustomerOrderService {
  constructor(
    private readonly customerOrderRepository: CustomerOrderRepository,
  ) {}

  create(orderId: number, customerId: number): Promise<CustomerOrderEntity> {
    return this.customerOrderRepository.create(orderId, customerId);
  }
}
