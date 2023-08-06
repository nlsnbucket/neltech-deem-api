import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../db/prisma.service";
import { CreateOrderNotesDto } from '../../domain/dtos/order-notes/create-order-notes.dto';
import { UpdateOrderNotesDto } from '../../domain/dtos/order-notes/update-order-notes.dto';
import { OrderNotesEntity } from "../../domain/entities/order-notes/order-notes.entity";

@Injectable()
export class OrderNotesRepository{
    constructor(private readonly prismaService: PrismaService) {}

    create(CreateOrderNotesDto: CreateOrderNotesDto): Promise<OrderNotesEntity> {
        return this.prismaService.orderNotes.create({
            data: {
                ...CreateOrderNotesDto,
                deletedAt: null,
            },
        });
    }

    findAllById(orderId: number){
        return this.prismaService.orderNotes.findMany({
            where: {
                orderId: orderId,
                deletedAt: null,
            }
        })
    }

    findById(id: number){
        return this.prismaService.orderNotes.findFirst({
            where: {
                id,
                deletedAt: null,
            }
        })
    }

    update(id : number, UpdateOrderNotesDto: UpdateOrderNotesDto): Promise<OrderNotesEntity>{
        return this.prismaService.orderNotes.update({
            where: {
                id,
            },
            data: {
                ...UpdateOrderNotesDto,
            }
        })
    }

    softDelete(id:number){
        return this.prismaService.orderNotes.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date(),
            }
        })
    }
    
}

