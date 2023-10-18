import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRelationsTableDto {
  @IsNotEmpty()
  @IsString()
  representCiNumbers: string;

  @IsNotEmpty()
  @IsString()
  fichaId: string;

  @IsOptional()
  @IsString()
  motherPersonCiNumbers?: string;

  @IsOptional()
  @IsString()
  fatherPersonCiNumbers?: string;

  @IsOptional()
  @IsString()
  thirdPersonCiNumbers?: string;

  @IsNotEmpty()
  @IsString()
  statusId: string;

  @IsNotEmpty()
  @IsString()
  studentId: string;
}
