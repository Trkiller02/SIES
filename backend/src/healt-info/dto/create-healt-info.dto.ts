import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHealtInfoDto {
  @IsOptional()
  @IsString()
  typeAler?: string;

  @IsOptional()
  @IsString()
  operation?: string;

  @IsNotEmpty()
  @IsString()
  enfermedades: string;

  @IsNotEmpty()
  @IsString()
  conditionEsp: string;

  @IsNotEmpty()
  @IsString()
  asisMedica: string;

  @IsNotEmpty()
  @IsString()
  bloodType: string;

  @IsNotEmpty()
  @IsString()
  medicEsp: string;

  @IsNotEmpty()
  @IsString()
  infoMedic: string;

  @IsNotEmpty()
  @IsString()
  liveWith: string;

  @IsNotEmpty()
  @IsString()
  poseeHer: string;

  @IsOptional()
  @IsString()
  levelHer?: string;

  @IsOptional()
  @IsString()
  ageHer?: string;

  @IsNotEmpty()
  @IsString()
  preferComp: string;

  @IsNotEmpty()
  @IsString()
  creationGroup: string;

  @IsNotEmpty()
  @IsString()
  preferAct: string;

  @IsNotEmpty()
  @IsString()
  recreTime: string;

  @IsNotEmpty()
  @IsString()
  transporte: string;

  @IsNotEmpty()
  @IsString()
  resOriStudent: string;
}
