import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOrderNotesDto {
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
