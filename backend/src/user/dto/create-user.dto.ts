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
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty({
    message: validationMsg('El nombre', messagesEnum.not_empty),
  })
  ci_number: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty({
    message: validationMsg('El nombre', messagesEnum.not_empty),
  })
  @MinLength(2, {
    message: validationMsg('El nombre', messagesEnum.not_min),
  })
  name: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.toUpperCase().trim())
  @IsNotEmpty({
    message: validationMsg('El apellido', messagesEnum.not_empty),
  })
  @MinLength(2, {
    message: validationMsg('El apellido', messagesEnum.not_min),
  })
  lastname: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  @IsNotEmpty({
    message: validationMsg('La email', messagesEnum.not_empty),
  })
  email: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: validationMsg('La contraseña', messagesEnum.not_empty),
  })
  @MinLength(4)
  password: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  role_id: number;
}
