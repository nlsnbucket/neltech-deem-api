import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../db/prisma.module';
import { PrismaService } from '../../db/prisma.service';
import { OrderNotesEntity } from '../../domain/entities';
import { OrderNotesService } from './order-notes.service';
import { OrderNotesRepository } from './order-notes.repository';
import { OrderNotesController } from './order-notes.controller';

describe('OrderNotesService', () => {
  let service: OrderNotesService;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const OrderNote: OrderNotesEntity[] = [
    {
      id: 1,
      orderId: 1,
      name: "Teste",
      description: "Testing",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null
    },
    {
      id: 1,
      orderId: 1,
      name: "Teste",
      description: "Testing",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: expect.any(Date),
    }
  ];

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [OrderNotesController],
      providers:  [OrderNotesService, OrderNotesRepository],
    }).compile();

    service = moduleRef.get<OrderNotesService>(OrderNotesService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    prismaService.$disconnect();
    moduleRef.close();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create',async () => {
    const mockResponse = OrderNote[0];

    const createSpyMock = jest
    .spyOn(prismaService.orderNotes,'create')
    .mockResolvedValue(mockResponse)

    const createSpy = jest.spyOn(service, 'create');

    const response = await service.create({
      orderId: 1,
      name: "Teste",
      description: "Testing"
    })
    expect(response).toStrictEqual(mockResponse);

    expect(createSpyMock).toHaveBeenCalledWith({
      data: {
        orderId: 1,
        name: "Teste",
        description: "Testing",
        deletedAt: null,
      },
    });

    expect(createSpyMock).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  })

  it('findAllById',async () => {
    const mockResponse = OrderNote;

    const findManySpyMock = jest
      .spyOn(prismaService.orderNotes, 'findMany')
      .mockResolvedValue(mockResponse);

    const findManySpy = jest.spyOn(service, 'findAllById');
    const response = await service.findAllById(
      1 //orderId
    )

    expect(response).toStrictEqual(mockResponse);
    expect(findManySpyMock).toHaveBeenCalledWith({
      where: {
        orderId: 1,
        deletedAt: null,
      }
    })
    expect(findManySpyMock).toHaveBeenCalledTimes(1);
    expect(findManySpy).toHaveBeenCalledTimes(1);
  })

  it('update',async () => {
    const responseMock = OrderNote[0];

    const findFirstSpyMock = jest
    .spyOn(prismaService.orderNotes, 'findFirst')
    .mockResolvedValue(responseMock);

    const updateSpy = jest
      .spyOn(prismaService.orderNotes, 'update')
      .mockResolvedValue(responseMock);

    const spyUpdate = jest.spyOn(service, 'update');
    const response = await service.update(1,{
      orderId: 1,
      name: "Teste",
      description: "Testing"
    });

    expect(response).toStrictEqual(responseMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where:{
        id: 1
      },
      data: {
        orderId: 1,
        name: "Teste",
        description: "Testing"
      },
    });

    expect(findFirstSpyMock).toHaveBeenCalledTimes(1);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(1);
  })

  it('softDelete',async () => {
    const responseMock = OrderNote[1];

    const findFirstSpyMock = jest
    .spyOn(prismaService.orderNotes, 'findFirst')
    .mockResolvedValue(responseMock);

    const removeSpy = jest
      .spyOn(prismaService.orderNotes, 'update')
      .mockResolvedValue(responseMock);

    const spyRemove = jest.spyOn(service, 'softDelete');
    
    const response = await service.softDelete(1);

    expect(response).toStrictEqual(responseMock);
    expect(removeSpy).toHaveBeenCalledWith({
      where: {
        id: 1,
        deletedAt: null
      },
      data: {
        deletedAt: expect.any(Date),
      },
    });

    expect(findFirstSpyMock).toHaveBeenCalledTimes(1);
    expect(spyRemove).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledTimes(1);
  })
});
