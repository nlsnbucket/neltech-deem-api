import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccessDto } from '../../domain/dtos';
import { UserService } from '../user/user.service';
import { AccessRepository } from './access.repository';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessService {
  constructor(
    private readonly accessRepository: AccessRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAccessDto: CreateAccessDto, userAgent: string) {
    const user = await this.userService.findByEmail(createAccessDto.email);

    const passwordIsCorrect = await bcrypt.compare(
      createAccessDto.password,
      user.password,
    );

    if (!passwordIsCorrect)
      throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED);

    const accessExist = await this.accessRepository.findByUserAgent(
      user.id,
      userAgent,
    );

    const access = !accessExist
      ? await this.accessRepository.create(user.id, userAgent)
      : await this.accessRepository.update(accessExist.id);

    return this.jwtService.sign({
      sub: access.id,
    });
  }

  async findOne(accessId: number) {
    const access = await this.accessRepository.findById(accessId);

    if (!access)
      throw new HttpException('Access not found', HttpStatus.NOT_FOUND);

    return access;
  }
}
