import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { msgEnum, validationMsg } from 'src/utils/handlerMsg';
import { ApiProperty } from '@nestjs/swagger';

export class RestorePasswordDto {
  @ApiProperty({
    pattern: '^[VEve]\\d+$',
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty()
  ci_number: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty({
    message: validationMsg('El token de recuperación', msgEnum.not_empty),
  })
  @MinLength(4)
  restore_token: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('La contraseña', msgEnum.not_empty),
  })
  @MinLength(4, {
    message: validationMsg('La contraseña', msgEnum.not_min),
  })
  password: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('La contraseña', msgEnum.not_empty),
  })
  @MinLength(4, {
    message: validationMsg('La contraseña', msgEnum.not_min),
  })
  repeatPassword: string;
}
