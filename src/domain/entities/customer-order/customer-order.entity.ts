import { CustomerOrder } from '@prisma/client';

export class CustomerOrderEntity implements CustomerOrder {
  id: number;
  customerId: number;
  orderId: number;
}
