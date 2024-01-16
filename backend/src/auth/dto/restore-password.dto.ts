import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { messagesEnum, validationMsg } from 'src/utils/handlerMsg';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RestorePasswordDto {
  @ApiPropertyOptional({
    pattern: '^[VE]\\d+$',
  })
  @IsOptional()
  @IsString()
  ciNumber: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim().toUpperCase())
  @IsNotEmpty({
    message: validationMsg('El token de recuperación', messagesEnum.not_empty),
  })
  @MinLength(4)
  restoreToken: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('La contraseña', messagesEnum.not_empty),
  })
  @MinLength(4, {
    message: validationMsg('La contraseña', messagesEnum.not_min),
  })
  password: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('La contraseña', messagesEnum.not_empty),
  })
  @MinLength(4, {
    message: validationMsg('La contraseña', messagesEnum.not_min),
  })
  repeatPassword: string;
}
