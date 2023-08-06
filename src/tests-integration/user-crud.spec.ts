import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../app.module';
import * as request from 'supertest';

async function bootstrapNestApp() {
  let app: INestApplication;

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  return app;
}

describe('user - integration', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    app = await bootstrapNestApp();
    prisma = new PrismaClient();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should create user', async () => {
    const payload = {
      name: 'nelson',
      username: 'nlsn',
      email: 'nelsonkenzotamashiro@gmail.com',
      password: '123456789',
    };

    const { body } = await request(app.getHttpServer())
      .post('/user')
      .send(payload)
      .expect(201);

    expect(body).toEqual({
      id: expect.anything(),
      name: 'nelson',
      username: 'nlsn',
      email: 'nelsonkenzotamashiro@gmail.com',
      phone: null,
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
      deletedAt: null,
    });
  });
});

