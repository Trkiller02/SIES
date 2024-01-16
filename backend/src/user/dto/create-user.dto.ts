import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { messagesEnum, validationMsg } from 'src/utils/handlerMsg';

export class CreateUserDto {
  @ApiProperty({
    pattern: '^[VE]\\d+$',
  })
  @IsString()
  @IsNotEmpty({
    message: validationMsg('El nombre', messagesEnum.not_empty),
  })
  ciNumber: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('El nombre', messagesEnum.not_empty),
  })
  @MinLength(2, {
    message: validationMsg('El nombre', messagesEnum.not_min),
  })
  name: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('El apellido', messagesEnum.not_empty),
  })
  @MinLength(2, {
    message: validationMsg('El apellido', messagesEnum.not_min),
  })
  lastName: string;

  @IsEmail()
  @IsNotEmpty({
    message: validationMsg('La email', messagesEnum.not_empty),
  })
  email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('La contraseña', messagesEnum.not_empty),
  })
  @MinLength(4)
  password: string;

  @Transform(({ value }) => value.trim().toUpperCase())
  @IsNotEmpty({
    message: validationMsg('El token de recuperación', messagesEnum.not_empty),
  })
  @MinLength(4)
  restoreToken: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date | string;

  @IsDate()
  @IsOptional()
  updatedAt?: Date | string;
}
