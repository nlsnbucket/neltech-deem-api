import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, SearchUserDto, UpdateUserDto } from 'src/domain/dtos';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const usernameAlreadyExists = await this.userRepository.forceFindByUsername(
      createUserDto.username,
    );

    if (usernameAlreadyExists)
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);

    const { password, ...user } = await this.userRepository.create(
      createUserDto,
    );

    return user;
  }

  findAll({ page, per_page, ...searchUserDto }: SearchUserDto) {
    return this.userRepository.findAll({ per_page, page }, searchUserDto);
  }

  async findOne(id: number, hidden = true) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const { password, ...userWithoutPassword } = user;

    return hidden ? userWithoutPassword : user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    const update = await this.userRepository.update(user.id, updateUserDto);

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    const update = await this.userRepository.softDelete(user.id);

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
