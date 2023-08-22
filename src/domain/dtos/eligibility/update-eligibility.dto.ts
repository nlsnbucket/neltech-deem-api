import { PartialType } from '@nestjs/mapped-types';
import { CreateEligibilityDto } from './create-eligibility.dto';

export class UpdateEligibilityDto extends PartialType(CreateEligibilityDto) {}
