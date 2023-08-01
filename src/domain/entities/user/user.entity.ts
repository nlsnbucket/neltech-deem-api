import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
