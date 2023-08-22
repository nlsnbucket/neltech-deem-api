import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import {
  CreateEligibilityDto,
  UpdateEligibilityDto,
} from 'src/domain/dtos/eligibility';
import { EligibilityEntity } from 'src/domain/entities/eligibility';

@Injectable()
export class EligibilityRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createEligibilityDto: CreateEligibilityDto,
  ): Promise<EligibilityEntity> {
    return await this.prismaService.eligibility.create({
      data: {
        ...createEligibilityDto,
        deletedAt: null,
      },
      include: {
        user: true,
        order: true,
      },
    });
  }

  async findById(eligibilityId: number): Promise<EligibilityEntity> {
    return this.prismaService.eligibility.findFirst({
      where: {
        id: eligibilityId,
        deletedAt: null,
      },
      include: {
        user: true,
        order: true,
      },
    });
  }

  async findByOrder(orderId: number): Promise<EligibilityEntity | null> {
    return this.prismaService.eligibility.findFirst({
      where: {
        orderId,
      },
      include: {
        user: true,
        order: true,
      },
    });
  }

  async findByUserIdAndOrderId(
    userId: number,
    orderId: number,
  ): Promise<EligibilityEntity | null> {
    return this.prismaService.eligibility.findFirst({
      where: {
        userId,
        orderId,
      },
      include: {
        user: true,
        order: true,
      },
    });
  }

  async update(
    orderId: number,
    updateEligibilityDto: UpdateEligibilityDto,
  ): Promise<EligibilityEntity> {
    return this.prismaService.eligibility.update({
      where: { id: orderId },
      include: {
        user: true,
        order: true,
      },
      data: { ...updateEligibilityDto, updatedAt: new Date() },
    });
  }

  async softDelete(eligibilityId: number): Promise<EligibilityEntity> {
    return this.prismaService.eligibility.update({
      where: {
        id: eligibilityId,
      },
      include: {
        user: true,
        order: true,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
  }
}
