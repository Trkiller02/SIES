import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/role/enum/roles.enum';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('USER:')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth([Role.ADMIN])
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Auth([Role.ADMIN])
  @ApiQuery({
    name: 'deleted',
    required: false,
    type: Boolean,
  })
  @Get()
  findAll(
    @Query('deleted', new ParseBoolPipe({ optional: true }))
    deleted?: boolean | null,
  ): Promise<User[]> {
    return this.userService.findAll(deleted);
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

  @Auth([Role.ADMIN])
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Put('/seed')
  seed() {
    return this.userService.seed();
  }
}
