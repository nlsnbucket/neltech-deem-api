import { Injectable } from '@nestjs/common';
import { EligibilityRepository } from './eligibility.repository';
import { CreateEligibilityDto } from 'src/domain/dtos/eligibility';

@Injectable()
export class EligibilityService {
  constructor(private readonly eligibilityRepository: EligibilityRepository) {}

  create(createEligibilityDto: CreateEligibilityDto) {
    return this.eligibilityRepository.create(createEligibilityDto);
  }
}
