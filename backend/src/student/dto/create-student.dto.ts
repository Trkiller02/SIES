import {
  IsString,
  IsDateString,
  IsNumber,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  ciNumber: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  secondName: string;

  @IsNotEmpty()
  @IsString()
  firstLastName: string;

  @IsNotEmpty()
  @IsString()
  secondLastName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  homeDir: string;

  @IsString()
  @IsNotEmpty()
  homeParroquia;

  @IsString()
  @IsNotEmpty()
  homeMunicipio;

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

  @IsDecimal()
  @IsOptional()
  weight?: number;

  @IsDecimal()
  @IsOptional()
  size?: number;

  @IsString()
  @IsNotEmpty()
  Lateralidad: string;

  @IsString()
  @IsNotEmpty()
  instPro: string;
}
