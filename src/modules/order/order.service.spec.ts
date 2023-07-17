import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../db/prisma.module';
import { PrismaService } from '../../db/prisma.service';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CustomerOrderModule } from '../customer-order/customer-order.module';
import { CustomerModule } from '../customer/customer.module';

describe('OrderService', () => {
  let service: OrderService;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

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

  // TODO: CRIAR TESTES AQUI
});
