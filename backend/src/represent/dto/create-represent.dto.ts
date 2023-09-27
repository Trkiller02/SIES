import {
  IsString,
  IsEmail,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';

export class CreateRepresentDto extends CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  civilStatus: string;

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
