import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOrderNoteDto {
    @IsNumber()
    @IsNotEmpty()
    orderId: number

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string
}
