import { IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class CreateFichaDto {
  @IsOptional()
  idFicha: string;

  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsString()
  etapa: string;

  @IsNotEmpty()
  @IsString()
  turno: string;

  @IsNotEmpty()
  @IsString()
  section: string;

  @IsNotEmpty()
  @IsString()
  procePlant: string;

  @IsOptional()
  @IsString()
  escolarPeriod: string;

  @IsOptional()
  @IsDate()
  InsDate: Date;

  @IsOptional()
  @IsString()
  personalRes: string;
}
