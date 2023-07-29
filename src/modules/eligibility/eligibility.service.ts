import { Injectable, NotFoundException } from '@nestjs/common';
import { EligibilityRepository } from './eligibility.repository';
import { CreateEligibilityDto } from 'src/domain/dtos/eligibility';

@Injectable()
export class EligibilityService {
  constructor(private readonly eligibilityRepository: EligibilityRepository) {}

  async create(createEligibilityDto: CreateEligibilityDto) {
    const { userId, orderId } = createEligibilityDto;

    const existingEligibility =
      await this.eligibilityRepository.findByUserIdAndOrderId(userId, orderId);

    if (existingEligibility) {
      throw new NotFoundException(
        'Já existe uma elegibilidade para esse usuário e projeto.',
      );
    }

    return this.eligibilityRepository.create(createEligibilityDto);
  }
}
