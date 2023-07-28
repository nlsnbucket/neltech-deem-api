import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { CreateEligibilityDto } from 'src/domain/dtos/eligibility';
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
}
