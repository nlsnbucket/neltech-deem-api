import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderNoteDto } from './create-order-note.dto';

export class UpdateOrderNoteDto extends PartialType(CreateOrderNoteDto) {}
