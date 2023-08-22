import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EligibilityService } from './eligibility.service';
import {
  CreateEligibilityDto,
  UpdateEligibilityDto,
  SearchEligibilityDto,
} from '../../domain/dtos';

@Controller('eligibility')
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  @Post()
  create(@Body() createEligibilityDto: CreateEligibilityDto) {
    return this.eligibilityService.create(createEligibilityDto);
  }

  @Get()
  findAll(@Query() searchEligibilityDto: SearchEligibilityDto) {
    console.log(searchEligibilityDto);

    return this.eligibilityService.findAll(searchEligibilityDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEligibilityDto: UpdateEligibilityDto,
  ) {
    return this.eligibilityService.update(+id, updateEligibilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eligibilityService.remove(+id);
  }
}
