import { Test, TestingModule } from '@nestjs/testing';
import { AccessService } from './access.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../db/prisma.module';
import { environment } from '../../config/environment';
import { AccessController } from './access.controller';
import { AccessRepository } from './access.repository';
import { PrismaService } from '../../db/prisma.service';
import { AccessEntity } from 'src/domain/entities';

describe('AccessRepository', () => {
  let repository: AccessRepository;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const accesses: AccessEntity[] = [
    {
      id: 1,
      userAgent: 'Chrome',
      userId: 1,
      lastAccess: expect.any(Date),
      disconnectedAt: expect.any(Date),
    },
  ];

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        UserModule,
        PrismaModule,
        JwtModule.register({
          global: true,
          secret: environment.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [AccessController],
      providers: [AccessService, AccessRepository],
    }).compile();

    repository = moduleRef.get<AccessRepository>(AccessRepository);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  afterEach(() => {
    prismaService.$disconnect();

    moduleRef.close();
  });

  // it('create', async () => {
  //   const createSpy = jest
  //     .spyOn(prismaService.access, 'create')
  //     .mockResolvedValue(accesses[0]);

  //   const spyCreate = jest.spyOn(repository, 'create');
  //   const response = await repository.create(1, 'Chrome');

  //   expect(response).toStrictEqual(accesses[0]);
  //   expect(createSpy).toHaveBeenCalledWith({
  //     data: {
  //       userId: 1,
  //       userAgent: 'Chrome',
  //       disconnectedAt: null,
  //     },
  //   });

  //   expect(spyCreate).toHaveBeenCalledTimes(1);
  //   expect(createSpy).toHaveBeenCalledTimes(1);
  // });

  // it('findByUserAgent', async () => {
  //   const createSpy = jest
  //     .spyOn(prismaService.access, 'findFirst')
  //     .mockResolvedValue(accesses[0]);

  //   const spyCreate = jest.spyOn(repository, 'findByUserAgent');
  //   const response = await repository.findByUserAgent(1, 'Chrome');

  //   expect(response).toStrictEqual(accesses[0]);
  //   expect(createSpy).toHaveBeenCalledWith({
  //     where: {
  //       userId: 1,
  //       userAgent: 'Chrome',
  //       disconnectedAt: null,
  //     },
  //   });

  //   expect(spyCreate).toHaveBeenCalledTimes(1);
  //   expect(createSpy).toHaveBeenCalledTimes(1);
  // });

  // it('findById', async () => {
  //   const createSpy = jest
  //     .spyOn(prismaService.access, 'findFirst')
  //     .mockResolvedValue(accesses[0]);

  //   const spyCreate = jest.spyOn(repository, 'findById');
  //   const response = await repository.findById(1);

  //   expect(response).toStrictEqual(accesses[0]);
  //   expect(createSpy).toHaveBeenCalledWith({
  //     where: {
  //       id: 1,
  //       disconnectedAt: null,
  //     },
  //   });

  //   expect(spyCreate).toHaveBeenCalledTimes(1);
  //   expect(createSpy).toHaveBeenCalledTimes(1);
  // });

  // it('update', async () => {
  //   const createSpy = jest
  //     .spyOn(prismaService.access, 'update')
  //     .mockResolvedValue(accesses[0]);

  // const spyCreate = jest.spyOn(repository, 'updateLastAccess');
  // const response = await repository.updateLastAccess(1);

  //   expect(response).toStrictEqual(accesses[0]);
  //   expect(createSpy).toHaveBeenCalledWith({
  //     where: {
  //       id: 1,
  //     },
  //     data: {
  //       lastAccess: expect.any(Date),
  //     },
  //   });

  //   expect(spyCreate).toHaveBeenCalledTimes(1);
  //   expect(createSpy).toHaveBeenCalledTimes(1);
  // });
});
