import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { AccessEntity } from 'src/domain/entities';

@Injectable()
export class AccessRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(userId: number, userAgent: string): Promise<AccessEntity> {
    return this.prismaService.access.create({
      data: {
        userId,
        userAgent,
        disconnectedAt: null,
      },
    });
  }

  findByUserAgent(userId: number, userAgent: string): Promise<AccessEntity> {
    return this.prismaService.access.findFirst({
      where: {
        userId,
        userAgent,
        disconnectedAt: null,
      },
    });
  }

  update(accessId: number): Promise<AccessEntity> {
    return this.prismaService.access.update({
      where: {
        id: accessId,
      },
      data: {
        lastAccess: new Date(),
      },
    });
  }
}
