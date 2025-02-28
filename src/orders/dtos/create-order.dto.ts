import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDTO {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsNotEmpty()
    colorVariantId: string;

    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDTO {
    @IsOptional()
    @IsString()
    clientId?: string;

    @IsOptional()
    client?: {
        name: string;
        email: string;
        address: string;
        phone?: string;
    };

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items: OrderItemDTO[];
}