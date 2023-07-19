import { Module } from '@nestjs/common';
import { CustomerOrderService } from './customer-order.service';
import { CustomerOrderRepository } from './customer-order.repository';

@Module({
  providers: [CustomerOrderService, CustomerOrderRepository],
  exports: [CustomerOrderService],
})
export class CustomerOrderModule {}
