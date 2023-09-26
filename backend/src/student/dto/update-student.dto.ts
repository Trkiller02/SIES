import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import {
  IsString,
  IsEmail,
  IsDateString,
  IsNumberString,
  IsNumber,
  IsDecimal,
  IsOptional,
} from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsString()
  @IsOptional()
  ciNumber?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  secondName?: string;

  @IsOptional()
  @IsString()
  firstLastName?: string;

  @IsOptional()
  @IsString()
  secondLastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  bornPlace?: string;

  @IsOptional()
  @IsString()
  bornState?: string;

  @IsOptional()
  @IsString()
  bornMunicipio?: string;

  @IsString()
  @IsOptional()
  bornParroquia?: string;

  @IsString()
  @IsOptional()
  bornPais?: string;

  @IsDateString()
  @IsOptional()
  bornDate?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  sex?: string;

  @IsDecimal()
  @IsOptional()
  weight?: number;

  @IsDecimal()
  @IsOptional()
  size?: number;

  @IsString()
  @IsOptional()
  Lateralidad?: string;

  @IsString()
  @IsOptional()
  instPro?: string;

  @IsString()
  @IsOptional()
  homeDir?: string;

  @IsString()
  @IsOptional()
  homeParroquia?: string;

  @IsString()
  @IsOptional()
  homeMunicipio?: string;

  @IsOptional()
  representCiNumber?: never;
}
