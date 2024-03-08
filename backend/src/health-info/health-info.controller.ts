import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/role/enum/roles.enum';
import { UpdateHealthInfoDto } from './dto/update-health-info.dto';
import { CreateHealthInfoDto } from './dto/create-health-info.dto';
import { HealthInfoService } from './health-info.service';

@ApiTags('HEALTH-INFO:')
@ApiBearerAuth() // método de autorización de Swagger para este controlador
@Auth([Role.AUDITOR, Role.EDITOR])
@Controller('health-info')
export class HealthInfoController {
  constructor(private readonly healthInfoService: HealthInfoService) {}

  @Post()
  create(@Body() createHealtInfoDto: CreateHealthInfoDto) {
    return this.healthInfoService.create(createHealtInfoDto);
  }

  @Get()
  findAll() {
    return this.healthInfoService.findAll();
  }

  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthInfoService.findOne(id);
  }

  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHealtInfoDto: UpdateHealthInfoDto,
  ) {
    return this.healthInfoService.update(id, updateHealtInfoDto);
  }

  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthInfoService.remove(id);
  }
}
