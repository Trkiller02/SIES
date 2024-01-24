import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateFichaDto } from 'src/ficha/dto/create-ficha.dto';
import { CreateHealtInfoDto } from 'src/healt-info/dto/create-healt-info.dto';
import { CreateRepresentDto } from 'src/represent/dto/create-represent.dto';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';

export class CreateRelationsTableDto {
  @IsNotEmpty()
  @IsString()
  represent_id: CreateRepresentDto;

  @IsNotEmpty()
  @IsString()
  ficha_id: CreateFichaDto;

  @IsOptional()
  @IsString()
  mother_id?: CreateRepresentDto;

  @IsOptional()
  @IsString()
  father_id?: CreateRepresentDto;

  @IsNotEmpty()
  @IsString()
  healt_info_id: CreateHealtInfoDto;

  @IsNotEmpty()
  @IsString()
  student_id: CreateStudentDto;
}
