import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserEntity } from '../../domain/entities';
import { PrismaModule } from '../../db/prisma.module';
import { PrismaService } from '../../db/prisma.service';

describe('UserRepository', () => {
  let repository: UserRepository;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const user: UserEntity[] = [
    {
      id: 1,
      name: 'test',
      username: 'string',
      email: 'test@email.com',
      password: 'abc123',
      phone: '1193752184',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null,
    },
  ];

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UserService, UserRepository],
      exports: [UserService],
    }).compile();

    repository = moduleRef.get<UserRepository>(UserRepository);
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
    const responseMock = user[0];

    const createSpy = jest
      .spyOn(prismaService.user, 'create')
      .mockResolvedValue(responseMock);

    const spyCreate = jest.spyOn(repository, 'create');
    const response = await repository.create({
      name: 'test',
      username: 'string',
      email: 'test@email.com',
      password: 'abc123',
      phone: '1193752184',
    });

    expect(response).toStrictEqual(responseMock);
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        name: 'test',
        username: 'string',
        email: 'test@email.com',
        password: 'abc123',
        phone: '1193752184',
        deletedAt: null,
      },
    });

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });

  it('findById', async () => {
    const responseMock = user[0];

    const findOneSpy = jest
      .spyOn(prismaService.user, 'findFirst')
      .mockResolvedValue(responseMock);

    const spyFindAll = jest.spyOn(repository, 'findById');
    const response = await repository.findById(1);

    expect(response).toStrictEqual(responseMock);
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id: 1,
        deletedAt: null,
      },
    });

    expect(spyFindAll).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledTimes(1);
  });

  it('forceFindByUsername', async () => {
    const responseMock = user[0];

    const findSpy = jest
      .spyOn(prismaService.user, 'findFirst')
      .mockResolvedValue(responseMock);

    const spyFind = jest.spyOn(repository, 'forceFindByUsername');
    const response = await repository.forceFindByUsername('string');

    expect(response).toStrictEqual(responseMock);
    expect(findSpy).toHaveBeenCalledWith({
      where: {
        username: 'string',
      },
    });

    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  it('update', async () => {
    const responseMock = user[0];

    const findSpy = jest
      .spyOn(prismaService.user, 'update')
      .mockResolvedValue(responseMock);

    const spyFind = jest.spyOn(repository, 'update');
    const response = await repository.update(1, { name: 'test' });

    expect(response).toStrictEqual(responseMock);
    expect(findSpy).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'test', updatedAt: expect.any(Date) },
    });

    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  it('softDelete', async () => {
    const responseMock = user[0];

    const findSpy = jest
      .spyOn(prismaService.user, 'update')
      .mockResolvedValue(responseMock);

    const spyFind = jest.spyOn(repository, 'softDelete');
    const response = await repository.softDelete(1);

    expect(response).toStrictEqual(responseMock);
    expect(findSpy).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      data: {
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      },
    });

    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledTimes(1);
  });
});
