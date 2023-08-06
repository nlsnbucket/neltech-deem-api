import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderNotesDto } from '../../domain/dtos/order-notes/create-order-notes.dto';
import { UpdateOrderNotesDto } from '../../domain/dtos/order-notes/update-order-notes.dto';
import { OrderNotesRepository } from './order-notes.repository';

@Injectable()
export class OrderNotesService {

  constructor(
    private readonly orderNotesRepository: OrderNotesRepository,
  ) {}


  async create(CreateOrderNotesDto: CreateOrderNotesDto) {
    const orderNote = await this.orderNotesRepository.create(CreateOrderNotesDto);
    return orderNote;
  }

  async findAllById(orderId: number) {
    const orderNotes = await this.orderNotesRepository.findAllById(orderId);

    return orderNotes;
  }

  async update(id: number, UpdateOrderNotesDto: UpdateOrderNotesDto) {
    const orderNote = await this.orderNotesRepository.findById(id);

    if (!orderNote)
      throw new HttpException('order note not found', HttpStatus.NOT_FOUND);

    const orderNoteUpdate = await this.orderNotesRepository.update(id,UpdateOrderNotesDto);

    return orderNoteUpdate;
  }


  async softDelete(id: number) {
    const orderNote = await this.orderNotesRepository.findById(id);

    if (!orderNote)
      throw new HttpException('order note not found', HttpStatus.NOT_FOUND);

    const orderNoteSoftDelete = await this.orderNotesRepository.softDelete(id);

    return orderNoteSoftDelete;
  }
}
