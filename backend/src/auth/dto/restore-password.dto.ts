import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { messagesEnum, validationMsg } from 'src/utils/handlerMsg';

export class RestorePasswordDto {
  @IsOptional()
  @IsString()
  ciNumber: string;

  @Transform(({ value }) => value.trim().toUpperCase())
  @IsNotEmpty({
    message: validationMsg('El token de recuperación', messagesEnum.not_empty),
  })
  @MinLength(4)
  restoreToken: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('La contraseña', messagesEnum.not_empty),
  })
  @MinLength(4, {
    message: validationMsg('La contraseña', messagesEnum.not_min),
  })
  password: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('La contraseña', messagesEnum.not_empty),
  })
  @MinLength(4, {
    message: validationMsg('La contraseña', messagesEnum.not_min),
  })
  repeatPassword: string;
}
