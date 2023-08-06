import { Injectable } from '@nestjs/common';
import { CreateAccessDto } from '../../domain/dtos';
import { UserService } from '../user/user.service';
import { AccessRepository } from './access.repository';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_PROVIDER } from 'src/domain/enums';
import { githubAuth, githubGetUser } from 'src/utils/github';

@Injectable()
export class AccessService {
  constructor(
    private readonly accessRepository: AccessRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  makeSocialLogin(createAccessDto: CreateAccessDto): Promise<string> {
    switch (createAccessDto.provider) {
      case ACCESS_PROVIDER.GITHUB:
        return this.makeLoginWithGithub(createAccessDto.code);
    }
  }

  private async makeLoginWithGithub(code: string): Promise<string> {
    const token = await githubAuth(code);

    const user = await githubGetUser(token.access_token);

    return this.createAccess(
      { ...user, name: user.name, username: user.login, id: user.node_id },
      ACCESS_PROVIDER.GITHUB,
    );
  }

  private async createAccess(user: any, loginType: ACCESS_PROVIDER) {
    let access = await this.findLogin(user.id);

    if (!access) {
      access = await this.accessRepository.create(user.id, loginType);

      await this.userService.create({
        ...(user.picture && { avatarUrl: user.picture }),
        ...user,
        accessId: access.id,
      });
    }

    return this.jwtService.sign({
      sub: access.id,
    });
  }

  private async findLogin(token: string) {
    const access = await this.accessRepository.findByToken(token);

    if (access) await this.accessRepository.updateLastAccess(access.id);

    return access;
  }
}
