import {
  IsString,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';

export class CreateStudentDto extends CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  liveWith: string;

  @IsNotEmpty()
  @IsString()
  bornState: string;

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
