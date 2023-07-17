import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
})
export class AppModule {}
