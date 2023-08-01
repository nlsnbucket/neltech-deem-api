import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../db/prisma.module';
import { PrismaService } from '../../db/prisma.service';
import { OrderNotesRepository } from './order-notes.repository';
import { OrderNotesService } from './order-notes.service';
import { OrderNotesController } from './order-notes.controller';
import { OrderNoteEntity } from '../../domain/entities';

describe('OrderNotesRepository', () => {
  let repository: OrderNotesRepository;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const OrderNote: OrderNoteEntity[] = [
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
      providers: [OrderNotesService, OrderNotesRepository],
    }).compile();

    repository = moduleRef.get<OrderNotesRepository>(OrderNotesRepository);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    prismaService.$disconnect();
    moduleRef.close();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('create', async () => {
    const mockResponse = OrderNote[0];

    const createSpyMock = jest
    .spyOn(prismaService.orderNotes,'create')
    .mockResolvedValue(mockResponse)

    const createSpy = jest.spyOn(repository, 'create');

    const response = await repository.create({
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

  it('findAllById', async () => {
    const mockResponse = OrderNote;

    const findManySpyMock = jest
      .spyOn(prismaService.orderNotes, 'findMany')
      .mockResolvedValue(mockResponse);

    const findManySpy = jest.spyOn(repository, 'findAllById');
    const response = await repository.findAllById(
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

  it('findById', async () => {
    const mockResponse = OrderNote[0];

    const findFirstSpyMock = jest
      .spyOn(prismaService.orderNotes, 'findFirst')
      .mockResolvedValue(mockResponse);

    const findFirstSpy = jest.spyOn(repository,'findById');
    const response = await repository.findById(
      1 
    )

    expect(response).toStrictEqual(mockResponse);
    expect(findFirstSpyMock).toHaveBeenCalledWith({
      where: {
        id: 1,
        deletedAt: null,
      }
    })
    expect(findFirstSpyMock).toHaveBeenCalledTimes(1);
    expect(findFirstSpy).toHaveBeenCalledTimes(1);
  })

  it('update', async () =>{

    const responseMock = OrderNote[0];

    const updateSpy = jest
      .spyOn(prismaService.orderNotes, 'update')
      .mockResolvedValue(responseMock);

    const spyUpdate = jest.spyOn(repository, 'update');
    const response = await repository.update(1,{
      orderId: 1,
      name: "Teste",
      description: "Testing"
    });

    expect(response).toStrictEqual(responseMock);
    expect(updateSpy).toHaveBeenCalledWith({
      where:{
        id: 1,
        deletedAt: null,
      },
      data: {
        orderId: 1,
        name: "Teste",
        description: "Testing",
        deletedAt: null,
      },
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(1);

  })

  it('remove', async () =>{
    const responseMock = OrderNote[1];

    const removeSpy = jest
      .spyOn(prismaService.orderNotes, 'update')
      .mockResolvedValue(responseMock);

    const spyRemove = jest.spyOn(repository, 'remove');
    
    const response = await repository.remove(1);

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

    expect(spyRemove).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledTimes(1);

  })

});