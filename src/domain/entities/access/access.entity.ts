import { Access } from '@prisma/client';

export class AccessEntity implements Access {
  id: number;
  userAgent: string;
  userId: number;
  lastAccess: Date;
  disconnectedAt: Date;
}
