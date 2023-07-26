import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../db/prisma.module';
import { PrismaService } from '../../db/prisma.service';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CustomerOrderModule } from '../customer-order/customer-order.module';
import { CustomerModule } from '../customer/customer.module';
import {
  CustomerEntity,
  CustomerOrderEntity,
  OrderEntity,
} from 'src/domain/entities';

describe('OrderService', () => {
  let service: OrderService;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const customer: CustomerEntity[] = [
    {
      id: 1,
      phoneNumber: '12312321',
      email: 'test@example.com',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null,
    },
  ];

  const orders: OrderEntity[] = [
    {
      id: 1,
      reason: 'test',
      description: 'test',
      offer: 124,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null,
    },
  ];

  const customerOrder: CustomerOrderEntity[] = [
    {
      id: 1,
      customerId: 1,
      orderId: 1,
    },
  ];

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [CustomerModule, CustomerOrderModule, PrismaModule],
      controllers: [OrderController],
      providers: [OrderService, OrderRepository],
    }).compile();

    service = moduleRef.get<OrderService>(OrderService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('create', async () => {
    const responseMock = orders[0];

    jest.spyOn(prismaService.customer, 'create').mockResolvedValue(customer[0]);
    jest.spyOn(prismaService.order, 'create').mockResolvedValue(orders[0]);
    const createSpy = jest
      .spyOn(prismaService.customerOrder, 'create')
      .mockResolvedValue(customerOrder[0]);

    const spyCreate = jest.spyOn(service, 'create');
    const response = await service.create({
      reason: 'test',
      description: 'test',
      offer: 124,
      phoneNumber: '12312321',
      email: 'test@example.com',
    });

    expect(response).toStrictEqual(responseMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        customerId: 1,
        orderId: 1,
      },
    });

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
