import { Test, TestingModule } from '@nestjs/testing';
import { AccessService } from './access.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../db/prisma.module';
import { environment } from '../../config/environment';
import { AccessController } from './access.controller';
import { AccessRepository } from './access.repository';
import { PrismaService } from '../../db/prisma.service';
import { AccessEntity, UserEntity } from 'src/domain/entities';
import bcrypt from 'bcrypt';

// Cheio de b.o nisso
describe.skip('AccessService', () => {
  let service: AccessService;
  let prismaService: PrismaService;
  let moduleRef: TestingModule;

  const users: UserEntity[] = [
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

  const accesses: AccessEntity[] = [
    {
      id: 1,
      userAgent: 'Chrome',
      userId: 1,
      lastAccess: expect.any(Date),
      disconnectedAt: null,
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

    service = moduleRef.get<AccessService>(AccessService);
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
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(users[0]);

    jest.fn().mockResolvedValue(true);
    bcrypt.compare as jest.Mock;

    jest.spyOn(prismaService.access, 'findFirst').mockResolvedValue(null);

    const createSpy = jest
      .spyOn(prismaService.access, 'create')
      .mockResolvedValue(accesses[0]);

    const spyCreate = jest.spyOn(service, 'create');
    const response = await service.create(
      {
        email: 'test@email.com',
        password: 'abc123',
      },
      'Chorme',
    );

    expect(response).toStrictEqual(expect.any(String));
    expect(createSpy).toHaveBeenCalledWith({
      data: {
        userId: 1,
        userAgent: 'Chrome',
        disconnectedAt: null,
      },
    });

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
