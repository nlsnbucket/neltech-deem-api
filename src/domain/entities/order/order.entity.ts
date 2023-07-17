import { Order } from '@prisma/client';

export class OrderEntity implements Order {
  id: number;
  reason: string;
  description: string;
  offer: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
