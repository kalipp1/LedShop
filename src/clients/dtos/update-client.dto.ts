import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  Length,
} from 'class-validator';

export class UpdateClientDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @IsInt()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(9)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  address: string;
}