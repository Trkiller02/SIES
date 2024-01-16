import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';

export class CreateRepresentDto extends CreatePersonDto {
  @IsOptional()
  @IsString()
  profession?: string;

  @IsOptional()
  @IsString()
  tlfnHome?: string;

  @IsString()
  @IsOptional()
  workPlace?: string;

  @IsOptional()
  @IsString()
  workPhoneNumber?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  incomeMonth?: number;
}
