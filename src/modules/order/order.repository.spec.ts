import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../db/prisma.module';
import { PrismaService } from '../../db/prisma.service';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CustomerModule } from '../customer/customer.module';
import { CustomerOrderModule } from '../customer-order/customer-order.module';
import { OrderEntity } from '../../domain/entities';

describe('OrderRepository', () => {
  let repository: OrderRepository;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const order: OrderEntity[] = [
    {
      id: 1,
      reason: 'test',
      description: 'test',
      offer: 521,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  const manyOrder = [
    {
      id: 1,
      reason: 'Creation of site',
      description: 'n/a',
      offer: 5012,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
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
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
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

    repository = moduleRef.get<OrderRepository>(OrderRepository);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('create', async () => {
    const responseMock = order[0];

    const createSpy = jest
      .spyOn(prismaService.order, 'create')
      .mockResolvedValue(responseMock);

    const spyCreate = jest.spyOn(repository, 'create');
    const response = await repository.create({
      reason: 'test',
      description: 'test',
      offer: 521,
    });

    expect(response).toStrictEqual(responseMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        reason: 'test',
        description: 'test',
        offer: 521,
        deletedAt: null,
      },
    });

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });

  it('findAll', async () => {
    const responseMock: any = manyOrder;

    const findAllSpy = jest
      .spyOn(prismaService.order, 'findMany')
      .mockResolvedValue(responseMock);

    const spyFindAll = jest.spyOn(repository, 'findAll');
    const response = await repository.findAll({
      page: '1',
      per_page: '10',
    });

    expect(response).toStrictEqual(responseMock);
    expect(findAllSpy).toHaveBeenCalledWith({
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

    expect(spyFindAll).toHaveBeenCalledTimes(1);
    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });

  it('findById', async () => {
    const responseMock: any = manyOrder;

    const findOneSpy = jest
      .spyOn(prismaService.order, 'findFirst')
      .mockResolvedValue(responseMock);

    const spyFindAll = jest.spyOn(repository, 'findById');
    const response = await repository.findById(1);

    expect(response).toStrictEqual(responseMock);
    expect(findOneSpy).toHaveBeenCalledWith({
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

    expect(spyFindAll).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledTimes(1);
  });
});
