import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { AccessEntity } from 'src/domain/entities';
import { ACCESS_PROVIDER } from 'src/domain/enums';

@Injectable()
export class AccessRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(token: string, provider: ACCESS_PROVIDER): Promise<AccessEntity> {
    return this.prismaService.access.create({
      data: {
        token,
        socialLogin: provider,
      },
    });
  }

  findById(id: number): Promise<AccessEntity> {
    return this.prismaService.access.findUnique({ where: { id } });
  }

  findByToken(token: string): Promise<AccessEntity> {
    return this.prismaService.access.findFirst({
      where: { token },
    });
  }

  updateAccess(id: number): Promise<AccessEntity> {
    return this.prismaService.access.update({
      where: { id },
      data: {
        lastAccess: new Date(),
      },
    });
  }
}
