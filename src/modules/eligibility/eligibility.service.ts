import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EligibilityRepository } from './eligibility.repository';
import { CreateEligibilityDto } from 'src/domain/dtos/eligibility';
import { SearchEligibilityDto, UpdateEligibilityDto } from 'src/domain/dtos';

@Injectable()
export class EligibilityService {
  constructor(private readonly eligibilityRepository: EligibilityRepository) {}

  async create(createEligibilityDto: CreateEligibilityDto) {
    const { userId, orderId } = createEligibilityDto;

    const existingEligibility =
      await this.eligibilityRepository.findByUserIdAndOrderId(userId, orderId);

    if (existingEligibility) {
      throw new NotFoundException('Eligibility already exists.');
    }

    return this.eligibilityRepository.create(createEligibilityDto);
  }

  async findAll({ orderId }: SearchEligibilityDto) {
    return this.eligibilityRepository.findByOrder(orderId);
  }

  async findOne(id: number) {
    const eligibility = await this.eligibilityRepository.findById(id);

    if (!eligibility)
      throw new HttpException('eligibility not found', HttpStatus.NOT_FOUND);

    return eligibility;
  }

  async update(id: number, updateEligibilityDto: UpdateEligibilityDto) {
    const eligibility = await this.findOne(id);

    const update = await this.eligibilityRepository.update(
      eligibility.id,
      updateEligibilityDto,
    );

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: number) {
    const eligibility = await this.findOne(id);

    const update = await this.eligibilityRepository.softDelete(eligibility.id);

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
