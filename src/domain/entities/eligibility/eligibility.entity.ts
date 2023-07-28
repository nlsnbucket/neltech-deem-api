import { Eligibility, User, Order } from '@prisma/client';

export class EligibilityEntity implements Eligibility {
  id: number;
  type: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  user: User;
  userId: number;
  order: Order;
  orderId: number;
}
