import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import {
  CreateUserDto,
  PaginationOptionsDto,
  SearchUserDto,
  UpdateUserDto,
} from '../../domain/dtos';
import { UserEntity } from '../../domain/entities';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        deletedAt: null,
      },
    });
  }

  findById(userId: number): Promise<UserEntity> {
    return this.prismaService.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    });
  }

  forceFindByUsername(username: string): Promise<UserEntity> {
    return this.prismaService.user.findFirst({
      where: {
        username,
      },
    });
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  findAll(
    { page, per_page }: PaginationOptionsDto,
    searchUserDto: SearchUserDto,
  ) {
    return this.prismaService.user.findMany({
      where:
        Object.keys(searchUserDto).length > 0
          ? {
              OR: [
                searchUserDto.name && {
                  name: searchUserDto.name,
                },
                searchUserDto.name_not && {
                  name: {
                    not: searchUserDto.name_not,
                  },
                },
                searchUserDto.name_contains && {
                  name: {
                    contains: searchUserDto.name_contains,
                  },
                },
                searchUserDto.name_starts_with && {
                  name: {
                    startsWith: searchUserDto.name_starts_with,
                  },
                },
                searchUserDto.name_ends_with && {
                  name: {
                    endsWith: searchUserDto.name_ends_with,
                  },
                },
                searchUserDto.email && {
                  email: searchUserDto.email,
                },
                searchUserDto.email_not && {
                  email: {
                    not: searchUserDto.email_not,
                  },
                },
                searchUserDto.email_contains && {
                  email: {
                    contains: searchUserDto.email_contains,
                  },
                },
                searchUserDto.phone && {
                  phone: searchUserDto.phone,
                },
                searchUserDto.phone_not && {
                  phone: {
                    not: searchUserDto.phone_not,
                  },
                },
                searchUserDto.phone_contains && {
                  phone: {
                    contains: searchUserDto.phone_contains,
                  },
                },
              ],
            }
          : {
              deletedAt: null,
            },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { ...updateUserDto, updatedAt: new Date() },
    });
  }

  softDelete(userId: number): Promise<UserEntity> {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
  }
}
