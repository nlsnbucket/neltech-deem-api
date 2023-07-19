import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../db/prisma.module';
import { PrismaService } from '../../db/prisma.service';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { CustomerEntity } from '../../domain/entities';

describe('CustomerService', () => {
  let service: CustomerService;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const repositoryResponseMock: CustomerEntity[] = [
    {
      id: 1,
      phoneNumber: '152123512',
      email: 'test@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CustomerService, CustomerRepository],
    }).compile();

    service = moduleRef.get<CustomerService>(CustomerService);
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
      .spyOn(prismaService.customer, 'create')
      .mockResolvedValue(responseMock);

    const spyCreate = jest.spyOn(service, 'create');
    const response = await service.create({
      phoneNumber: '152123512',
      email: 'test@gmail.com',
    });

    expect(response).toStrictEqual(responseMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        phoneNumber: '152123512',
        email: 'test@gmail.com',
        deletedAt: null,
      },
    });

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
