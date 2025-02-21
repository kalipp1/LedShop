import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
  IsUUID,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class CreateProductDTO {
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

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  colorVariants: { color: string; price: number; imageUrl: string }[];
}