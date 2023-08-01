import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderNoteDto } from '../../domain/dtos/order-notes/create-order-note.dto';
import { UpdateOrderNoteDto } from '../../domain/dtos/order-notes/update-order-note.dto';
import { OrderNotesRepository } from './order-notes.repository';

@Injectable()
export class OrderNotesService {

  constructor(
    private readonly orderNotesRepository: OrderNotesRepository,
  ) {}


  async create(createOrderNoteDto: CreateOrderNoteDto) {
    const orderNote = await this.orderNotesRepository.create(createOrderNoteDto);
    return orderNote;
  }

  async findAllById(orderId: number) {
    const orderNotes = await this.orderNotesRepository.findAllById(orderId);

    return orderNotes;
  }

  async findOne(id: number) {
    const orderNote = await this.orderNotesRepository.findById(id);

    if (!orderNote)
      throw new HttpException('order note not found', HttpStatus.NOT_FOUND);

    return orderNote;
  }

  async update(id: number, updateOrderNoteDto: UpdateOrderNoteDto) {
    const orderNote = await this.orderNotesRepository.update(id,updateOrderNoteDto);

    if (!orderNote)
      throw new HttpException('order note not found', HttpStatus.NOT_FOUND);

    return orderNote;
  }

  async remove(id: number) {
    const orderNote = await this.orderNotesRepository.remove(id);

    if (!orderNote)
      throw new HttpException('order note not found', HttpStatus.NOT_FOUND);

    return orderNote;
  }
}
