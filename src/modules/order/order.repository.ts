import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'domain/dtos';
import { PaginationOptionsDto } from 'domain/dtos/pagination';
import { PrismaService } from '../../db/prisma.service';
import { OrderEntity } from 'domain/entities';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.prismaService.order.create({
      data: {
        ...createOrderDto,
        deletedAt: null,
      },
    });
  }

  findAll({ page, per_page }: PaginationOptionsDto) {
    return this.prismaService.order.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        CustomerOrder: {
          include: {
            customer: true,
          },
        },
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findById(id: number) {
    return this.prismaService.order.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        CustomerOrder: {
          include: {
            customer: true,
          },
        },
      },
    });
  }
}
