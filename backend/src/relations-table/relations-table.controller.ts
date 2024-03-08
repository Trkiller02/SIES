import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RelationsTableService } from './relations-table.service';
import { CreateRelationsTableDto } from './dto/create-relations-table.dto';
import { UpdateRelationsTableDto } from './dto/update-relations-table.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/role/enum/roles.enum';

@ApiTags('RELATION-TABLE:')
@ApiBearerAuth()
@Auth()
@Controller('relations-table')
export class RelationsTableController {
  constructor(private readonly relationsTableService: RelationsTableService) {}

  @Auth([Role.AUDITOR, Role.EDITOR])
  @Post()
  create(@Body() createRelationsTableDto: CreateRelationsTableDto) {
    return this.relationsTableService.create(createRelationsTableDto);
  }

  @Get()
  findAll() {
    return this.relationsTableService.findAll();
  }

  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relationsTableService.findOne(id);
  }

  @Auth([Role.AUDITOR, Role.EDITOR])
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRelationsTableDto: UpdateRelationsTableDto,
  ) {
    return this.relationsTableService.update(id, updateRelationsTableDto);
  }

  @Auth([Role.AUDITOR, Role.EDITOR])
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relationsTableService.remove(id);
  }
}
