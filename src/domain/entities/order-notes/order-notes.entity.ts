import { OrderNotes } from "@prisma/client";

export class OrderNotesEntity implements OrderNotes{
    id: number;
    orderId: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

}