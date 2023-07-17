import { Test, TestingModule } from '@nestjs/testing';
import { CustomerOrderService } from './customer-order.service';
import { PrismaModule } from '../../db/prisma.module';
import { PrismaService } from '../../db/prisma.service';
import { CustomerOrderRepository } from './customer-order.repository';
import { CustomerOrderEntity } from '../../domain/entities';

describe('CustomerOrderRepository', () => {
  let repository: CustomerOrderRepository;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const customerOrder: CustomerOrderEntity[] = [
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

    repository = moduleRef.get<CustomerOrderRepository>(
      CustomerOrderRepository,
    );
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
    const responseMock = customerOrder[0];

    const createSpy = jest
      .spyOn(prismaService.customerOrder, 'create')
      .mockResolvedValue(responseMock);

    const spyCreate = jest.spyOn(repository, 'create');
    const response = await repository.create(1, 1);

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
