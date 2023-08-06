import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  name: string;
  username: string;
  accessId: number;
  avatarUrl: string | null;
  email: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
