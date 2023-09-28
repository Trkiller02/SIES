import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFichaDto {
  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsString()
  section: string;

  @IsNotEmpty()
  @IsString()
  procePlat: string;

  @IsNotEmpty()
  @IsString()
  escolarPeriod: string;

  @IsOptional()
  @IsString()
  personalRes: string;
}
