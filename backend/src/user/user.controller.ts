import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/role/enum/roles.enum';
import { User } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiParam,
  ApiParamOptions,
  ApiTags,
} from '@nestjs/swagger';
import { query } from 'express';

@ApiTags('USER:')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth([Role.EVALUACION])
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Auth([Role.EVALUACION])
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Auth()
  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') query: string): Promise<User> {
    return this.userService.findOne(query);
  }

  // RUTA DE ACCESO PARA USUARIOS AUTENTICADOS
  @Auth()
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Auth([Role.EVALUACION])
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
