import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderNotesDto } from './create-order-notes.dto';

export class UpdateOrderNotesDto extends PartialType(CreateOrderNotesDto) {}
