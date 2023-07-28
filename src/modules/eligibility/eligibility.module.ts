import { Module } from '@nestjs/common';
import { EligibilityService } from './eligibility.service';
import { EligibilityRepository } from './eligibility.repository';

@Module({
  providers: [EligibilityService, EligibilityRepository],
  exports: [EligibilityService],
})
export class EligibilityModule {}
