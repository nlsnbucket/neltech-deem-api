import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prisma.module';
import { AppController } from './app.controller';
import { OrderModule } from './modules/order/order.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomerOrderModule } from './modules/customer-order/customer-order.module';

import { UserModule } from './modules/user/user.module';
import { OrderNotesModule } from './modules/order-notes/order-notes.module';

@Module({
  imports: [
    PrismaModule,
    OrderModule,
    CustomerModule,
    CustomerOrderModule,
    UserModule,
    OrderNotesModule
  ],
  controllers: [AppController],
})
export class AppModule {}
