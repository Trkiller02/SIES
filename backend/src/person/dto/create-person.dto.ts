import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
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
  homeParroquia: string;

  @IsString()
  @IsNotEmpty()
  homeMunicipio: string;

  @IsString()
  @IsOptional()
  relation: string;
}
