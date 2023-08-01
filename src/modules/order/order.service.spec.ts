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
import { HttpException } from '@nestjs/common';

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

  const manyOrders = [
    {
      id: 1,
      reason: 'Creation of site',
      description: 'n/a',
      offer: 5012,
      createdAt: '2023-07-26T19:40:05.712Z',
      updatedAt: '2023-07-26T19:40:05.712Z',
      deletedAt: null,
      CustomerOrder: [
        {
          id: 1,
          customerId: 1,
          orderId: 1,
          customer: {
            id: 1,
            phoneNumber: '119305767321',
            email: null,
            createdAt: '2023-07-26T19:40:05.544Z',
            updatedAt: '2023-07-26T19:40:05.544Z',
            deletedAt: null,
          },
        },
      ],
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

  it('findAll', async () => {
    const responseMock = manyOrders;

    const findSpy = jest
      .spyOn(prismaService.order as any, 'findMany')
      .mockResolvedValue(responseMock);

    const spyFind = jest.spyOn(service, 'findAll');
    const response = await service.findAll({ page: 1, per_page: 10 });

    expect(response).toStrictEqual(responseMock);
    expect(findSpy).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
      },
      include: {
        CustomerOrder: {
          include: {
            customer: true,
          },
        },
      },
      skip: (1 - 1) * 10,
      take: 10,
    });

    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  it('findOne', async () => {
    const responseMock = manyOrders[0];

    const findSpy = jest
      .spyOn(prismaService.order as any, 'findFirst')
      .mockResolvedValue(responseMock);

    const spyFind = jest.spyOn(service, 'findOne');
    const response = await service.findOne(1);

    expect(response).toStrictEqual(responseMock);
    expect(findSpy).toHaveBeenCalledWith({
      where: {
        id: 1,
        deletedAt: null,
      },
      include: {
        CustomerOrder: {
          include: {
            customer: true,
          },
        },
      },
    });

    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  it('Should throw an error when not found order', async () => {
    jest.spyOn(prismaService.order, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(service, 'findOne');

    await expect(service.findOne(1)).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
