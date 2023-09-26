import {
  IsString,
  IsEmail,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateRepresentDto {
  @IsString()
  @IsNotEmpty()
  afinidad: string;

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
  civilStatus: string;

  @IsString()
  @IsNotEmpty()
  homeDir: string;

  @IsString()
  @IsNotEmpty()
  homeParroquia: string;

  @IsString()
  @IsNotEmpty()
  homeMunicipio: string;

  @IsString()
  @IsNotEmpty()
  home: string;

  @IsString()
  @IsNotEmpty()
  Instrution: string;

  @IsString()
  @IsOptional()
  profession?: string;

  @IsString()
  @IsOptional()
  business?: string;

  @IsString()
  @IsOptional()
  workPlace?: string;

  @IsString()
  @IsOptional()
  workPhoneNumber?: string;

  @IsEmail()
  @IsOptional()
  workEmail?: string;

  @IsNumber()
  @IsOptional()
  incomeMonth?: number;

  @IsString()
  @IsOptional()
  sourceIncome?: string;
}
