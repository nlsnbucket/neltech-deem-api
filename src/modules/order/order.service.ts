import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CustomerService } from '../customer/customer.service';
import { CustomerOrderService } from '../customer-order/customer-order.service';
import { CreateOrderDto, PaginationOptionsDto } from '../../domain/dtos';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly customerService: CustomerService,
    private readonly customerOrderService: CustomerOrderService,
  ) {}

  async create({
    phoneNumber,
    email = null,
    ...createOrderDto
  }: CreateOrderDto) {
    const customer = await this.customerService.create({ phoneNumber, email });

    const order = await this.orderRepository.create(createOrderDto);

    await this.customerOrderService.create(customer.id, order.id);

    return order;
  }

  findAll(paginationOptions: PaginationOptionsDto) {
    return this.orderRepository.findAll(paginationOptions);
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findById(id);

    if (!order)
      throw new HttpException('order not found', HttpStatus.NOT_FOUND);

    return order;
  }
}
