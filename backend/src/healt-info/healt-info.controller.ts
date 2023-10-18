import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HealtInfoService } from './healt-info.service';
import { CreateHealtInfoDto } from './dto/create-healt-info.dto';
import { UpdateHealtInfoDto } from './dto/update-healt-info.dto';

@Controller('healt-info')
export class HealtInfoController {
  constructor(private readonly healtInfoService: HealtInfoService) {}

  @Post()
  create(@Body() createHealtInfoDto: CreateHealtInfoDto) {
    return this.healtInfoService.create(createHealtInfoDto);
  }

  @Get()
  findAll() {
    return this.healtInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healtInfoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHealtInfoDto: UpdateHealtInfoDto,
  ) {
    return this.healtInfoService.update(id, updateHealtInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healtInfoService.remove(id);
  }
}
