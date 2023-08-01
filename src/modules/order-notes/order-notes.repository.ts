import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../db/prisma.service";
import { CreateOrderNoteDto } from '../../domain/dtos/order-notes/create-order-note.dto';
import { UpdateOrderNoteDto } from '../../domain/dtos/order-notes/update-order-note.dto';
import { OrderNoteEntity } from "../../domain/entities/order-notes/order-note.entity";

@Injectable()
export class OrderNotesRepository{
    constructor(private readonly prismaService: PrismaService) {}

    create(createOrderNoteDto: CreateOrderNoteDto): Promise<OrderNoteEntity> {
        return this.prismaService.orderNotes.create({
            data: {
                ...createOrderNoteDto,
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

    update(id : number, updateOrderNoteDto: UpdateOrderNoteDto): Promise<OrderNoteEntity>{
        return this.prismaService.orderNotes.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                ...updateOrderNoteDto,
                deletedAt: null,
            }
        })
    }

    remove(id:number){
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

