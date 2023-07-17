import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { PrismaModule } from 'src/db/prisma.module';
import { CustomerRepository } from './customer.repository';
import { PrismaService } from 'src/db/prisma.service';
import { CustomerEntity } from 'src/domain/entities';

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
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CustomerService, CustomerRepository],
    }).compile();

    repository = module.get<CustomerRepository>(CustomerRepository);
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
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
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      },
    });

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
