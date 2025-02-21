import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
  IsUUID,
} from 'class-validator';

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 35)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  minPrice: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}