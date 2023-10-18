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

@Controller('relations-table')
export class RelationsTableController {
  constructor(private readonly relationsTableService: RelationsTableService) {}

  @Post()
  create(@Body() createRelationsTableDto: CreateRelationsTableDto) {
    return this.relationsTableService.create(createRelationsTableDto);
  }

  @Get()
  findAll() {
    return this.relationsTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relationsTableService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRelationsTableDto: UpdateRelationsTableDto,
  ) {
    return this.relationsTableService.update(id, updateRelationsTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relationsTableService.remove(id);
  }
}
