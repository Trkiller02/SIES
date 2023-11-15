import { IsString, IsNumber, IsOptional } from 'class-validator';
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
  incomeMonth?: number;
}
