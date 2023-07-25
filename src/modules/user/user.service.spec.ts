import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../../db/prisma.service';
import { PrismaModule } from '../../db/prisma.module';
import { UserEntity } from 'src/domain/entities';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
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

    service = moduleRef.get<UserService>(UserService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  // TODO: erro aqui
  it('create', async () => {
    const { password, ...responseMock } = user[0];

    jest.spyOn(bcrypt, 'hash').mockResolvedValue('abc123');
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

    const createSpy = jest
      .spyOn(prismaService.user, 'create')
      .mockResolvedValue({ ...responseMock, password });

    const spyCreate = jest.spyOn(service, 'create');
    const response = await service.create({
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

  it('Should throw an error when validation at the time of creation finds a user with the same name', async () => {
    const responseMock = user[0];

    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(responseMock);

    const spyFind = jest.spyOn(service, 'create');

    await expect(
      service.create({
        name: 'test',
        username: 'string',
        email: 'test@email.com',
        password: 'abc123',
        phone: '1193752184',
      }),
    ).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });

  it('findOne', async () => {
    const { password, ...responseMock } = user[0];

    const findSpy = jest
      .spyOn(prismaService.user, 'findFirst')
      .mockResolvedValue({ ...responseMock, password });

    const spyFind = jest.spyOn(service, 'findOne');
    const response = await service.findOne(1);

    expect(response).toStrictEqual(responseMock);
    expect(findSpy).toHaveBeenCalledWith({
      where: {
        id: 1,
        deletedAt: null,
      },
    });

    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  it('Should throw an error when not found user', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

    const spyFind = jest.spyOn(service, 'findOne');

    await expect(service.findOne(1)).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });

  it('update', async () => {
    const responseMock = user[0];

    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(responseMock);

    const findSpy = jest
      .spyOn(prismaService.user, 'update')
      .mockResolvedValue({ ...responseMock, email: 'abc123@gmail.com' });

    const spyFind = jest.spyOn(service, 'update');
    const response = await service.update(1, { email: 'abc123@gmail.com' });

    expect(response).toStrictEqual({
      ...responseMock,
      email: 'abc123@gmail.com',
    });
    expect(findSpy).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { email: 'abc123@gmail.com', updatedAt: expect.any(Date) },
    });

    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  it('Should throw an error when failed to update user', async () => {
    const responseMock = user[0];

    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(responseMock);

    jest.spyOn(prismaService.user, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(service, 'update');

    await expect(
      service.update(1, { email: 'abc123@gmail.com' }),
    ).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });

  it('remove', async () => {
    const responseMock = user[0];

    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(responseMock);

    const findSpy = jest
      .spyOn(prismaService.user, 'update')
      .mockResolvedValue({ ...responseMock, email: 'abc123@gmail.com' });

    const spyFind = jest.spyOn(service, 'remove');
    const response = await service.remove(1);

    expect(response).toStrictEqual(true);
    expect(findSpy).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { updatedAt: expect.any(Date), deletedAt: expect.any(Date) },
    });

    expect(spyFind).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  it('Should throw an error when failed to remove user', async () => {
    const responseMock = user[0];

    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(responseMock);

    jest.spyOn(prismaService.user, 'update').mockResolvedValue(null);

    const spyFind = jest.spyOn(service, 'remove');

    await expect(service.remove(1)).rejects.toThrow(HttpException);

    expect(spyFind).toHaveBeenCalledTimes(1);
  });
});
