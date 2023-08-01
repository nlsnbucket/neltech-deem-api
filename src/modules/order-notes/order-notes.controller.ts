import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderNotesService } from './order-notes.service';
import { CreateOrderNoteDto } from '../../domain/dtos/order-notes/create-order-note.dto';
import { UpdateOrderNoteDto } from '../../domain/dtos/order-notes/update-order-note.dto';

@Controller('order-notes')
export class OrderNotesController {
  constructor(private readonly orderNotesService: OrderNotesService) {}

  @Post()
  create(@Body() createOrderNoteDto: CreateOrderNoteDto) {
    return this.orderNotesService.create(createOrderNoteDto);
  }

  @Get('all/:orderId')
  findAllById(@Param('orderId') id: string) {
    return this.orderNotesService.findAllById(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderNotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderNoteDto: UpdateOrderNoteDto) {
    return this.orderNotesService.update(+id, updateOrderNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderNotesService.remove(+id);
  }
}
