import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
/* import { CreateFichaDto } from 'src/ficha/dto/create-ficha.dto';
import { CreateHealthInfoDto } from 'src/health-info/dto/create-health-info.dto';
import { CreateRepresentDto } from 'src/represent/dto/create-represent.dto';
import { CreateStudentDto } from 'src/student/dto/create-student.dto'; */

export class CreateRelationsTableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  represent_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ficha_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mother_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  father_id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  healt_info_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  student_id: string;
}
