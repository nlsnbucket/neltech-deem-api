import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { CustomerOrderModule } from '../customer-order/customer-order.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [CustomerModule, CustomerOrderModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}
