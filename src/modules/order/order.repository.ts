import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateOrderDto } from 'src/domain/dtos';
import { PaginationOptionsDto } from 'src/domain/dtos/pagination';
import { OrderEntity } from 'src/domain/entities';

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
    return this.prismaService.order.findMany({
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
