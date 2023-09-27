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
import { User as UserModel } from '@prisma/client';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enum/roles.enum';

@Auth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.userService.create(createUserDto);
  }

  @Auth([Role.ADMIN])
  @Get()
  findAll(): Promise<UserModel[] | Error> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserModel | Error> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel | Error> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserModel | Error> {
    return this.userService.remove(id);
  }
}
