import { Access } from '@prisma/client';

export class AccessEntity implements Access {
  id: number;
  socialLogin: string;
  token: string;
  lastAccess: Date;
}
