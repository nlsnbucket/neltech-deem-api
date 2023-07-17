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

  // TODO: CRIAR OS TESTES DO FINDBYID E FINDALL
});
