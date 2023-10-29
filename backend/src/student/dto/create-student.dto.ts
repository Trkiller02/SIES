import {
  IsString,
  IsDateString,
  IsNumber,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';

export class CreateStudentDto extends CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  bornPlace: string;

  @IsNotEmpty()
  @IsString()
  bornState: string;

  @IsNotEmpty()
  @IsString()
  bornMunicipio: string;

  @IsString()
  @IsNotEmpty()
  bornParroquia: string;

  @IsString()
  @IsNotEmpty()
  bornPais: string;

  @IsDateString()
  @IsNotEmpty()
  bornDate: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  sex: string;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  size?: number;

  @IsString()
  @IsNotEmpty()
  Lateralidad: string;

  @IsString()
  @IsNotEmpty()
  instPro: string;
}
