import { IsOptional, IsString } from 'class-validator';

export class CreateHealtInfoDto {
  @IsOptional()
  @IsString()
  typeAler?: string;

  @IsOptional()
  @IsString()
  trataEsp: string;

  @IsOptional()
  @IsString()
  preferAct: string;

  @IsOptional()
  @IsString()
  recreTime: string;

  @IsOptional()
  @IsString()
  siteAct: string;

  @IsOptional()
  @IsString()
  proLevel: string;

  @IsOptional()
  @IsString()
  plantProce: string;
}
