import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderNotesService } from './order-notes.service';
import { CreateOrderNotesDto } from '../../domain/dtos/order-notes/create-order-notes.dto';
import { UpdateOrderNotesDto } from '../../domain/dtos/order-notes/update-order-notes.dto';

@Controller('order-notes')
export class OrderNotesController {
  constructor(private readonly orderNotesService: OrderNotesService) {}

  @Post()
  create(@Body() CreateOrderNotesDto: CreateOrderNotesDto) {
    return this.orderNotesService.create(CreateOrderNotesDto);
  }

  @Get('order-id/:orderId')
  findAllById(@Param('orderId') id: string) {
    return this.orderNotesService.findAllById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateOrderNotesDto: UpdateOrderNotesDto) {
    return this.orderNotesService.update(+id, UpdateOrderNotesDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.orderNotesService.softDelete(+id);
  }
}
