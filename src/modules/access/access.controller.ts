import { Controller, Post, Body, Req } from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDto } from '../../domain/dtos';

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  create(@Body() createAccessDto: CreateAccessDto) {
    return this.accessService.makeSocialLogin(createAccessDto);
  }
}
