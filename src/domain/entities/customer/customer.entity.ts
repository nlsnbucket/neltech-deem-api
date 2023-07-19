import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  id: number;
  phoneNumber: string;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
