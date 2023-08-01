import { OrderNotes } from "@prisma/client";

export class OrderNoteEntity implements OrderNotes{
    id: number;
    orderId: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

}