import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
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

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('El nombre', messagesEnum.not_empty),
  })
  @MinLength(2, {
    message: validationMsg('El nombre', messagesEnum.not_min),
  })
  name: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('El apellido', messagesEnum.not_empty),
  })
  @MinLength(2, {
    message: validationMsg('El apellido', messagesEnum.not_min),
  })
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({
    message: validationMsg('La email', messagesEnum.not_empty),
  })
  email: string;

  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('La contraseña', messagesEnum.not_empty),
  })
  @MinLength(4)
  password: string;

  @ApiProperty({
    enumName: 'Role',
  })
  @IsNumber()
  @IsPositive()
  role_id: number;
}
