import { Test, TestingModule } from '@nestjs/testing';
import { CustomerOrderService } from './customer-order.service';
import { PrismaModule } from '../../db/prisma.module';
import { PrismaService } from '../../db/prisma.service';
import { CustomerOrderRepository } from './customer-order.repository';
import { CustomerOrderEntity } from '../../domain/entities';

describe('CustomerOrderService', () => {
  let service: CustomerOrderService;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const repositoryResponseMock: CustomerOrderEntity[] = [
    {
      id: 1,
      customerId: 1,
      orderId: 1,
    },
  ];

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CustomerOrderService, CustomerOrderRepository],
    }).compile();

    service = moduleRef.get<CustomerOrderService>(CustomerOrderService);
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
    const responseMock = repositoryResponseMock[0];

    const createSpy = jest
      .spyOn(prismaService.customerOrder, 'create')
      .mockResolvedValue(responseMock);

    const spyCreate = jest.spyOn(service, 'create');
    const response = await service.create(1, 1);

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
