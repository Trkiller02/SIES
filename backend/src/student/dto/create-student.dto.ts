import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber, IsNotEmpty } from 'class-validator';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';

export class CreateStudentDto extends CreatePersonDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  born_state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  born_pais: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  born_date: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
