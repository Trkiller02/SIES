import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from './enum/roles.enum';

@ApiTags('ROLE:')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Auth([Role.ADMIN])
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Auth([Role.ADMIN])
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Auth([Role.ADMIN])
  @Get(':id')
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Auth([Role.ADMIN])
  @Patch(':id')
  @ApiParam({ name: 'id' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Auth([Role.ADMIN])
  @Delete(':id')
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }

  @Put('/seed')
  seed() {
    return this.roleService.seed();
  }
}
