import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @IsOptional()
  clientId: string;

  @IsOptional()
  client?: {
    name: string;
    email: string;
    phone?: string;
    address: string;
  };
}