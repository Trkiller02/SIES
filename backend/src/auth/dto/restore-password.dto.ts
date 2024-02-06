import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { messagesEnum, validationMsg } from 'src/utils/handlerMsg';
import { ApiProperty } from '@nestjs/swagger';

export class RestorePasswordDto {
  @ApiProperty({
    pattern: '^[VEve]\\d+$',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  ci_number: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim().toUpperCase())
  @IsNotEmpty({
    message: validationMsg('El token de recuperación', messagesEnum.not_empty),
  })
  @MinLength(4)
  restore_token: string;

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
