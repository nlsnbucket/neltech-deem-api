import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../db/prisma.module';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { CustomerEntity } from '../../domain/entities';
import { PrismaService } from '../../db/prisma.service';

describe('CustomerRepository', () => {
  let repository: CustomerRepository;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const customers: CustomerEntity[] = [
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

    repository = moduleRef.get<CustomerRepository>(CustomerRepository);
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
    const responseMock = customers[0];

    const createSpy = jest
      .spyOn(prismaService.customer, 'create')
      .mockResolvedValue(responseMock);

    const spyCreate = jest.spyOn(repository, 'create');
    const response = await repository.create({
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
