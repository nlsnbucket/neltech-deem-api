import { Module } from '@nestjs/common';
import { OrderNotesService } from './order-notes.service';
import { OrderNotesController } from './order-notes.controller';
import { OrderNotesRepository } from './order-notes.repository';

@Module({
  controllers: [OrderNotesController],
  providers: [OrderNotesService, OrderNotesRepository],
  exports:  [OrderNotesService]
})
export class OrderNotesModule {}
