import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, SearchUserDto, UpdateUserDto } from '../../domain/dtos';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll({ page, per_page, ...searchUserDto }: SearchUserDto) {
    return this.userRepository.findAll({ per_page, page }, searchUserDto);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return user;
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
