import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RepresentService } from './represent.service';
import { CreateRepresentDto } from './dto/create-represent.dto';
import { UpdateRepresentDto } from './dto/update-represent.dto';

@Controller('represent')
export class RepresentController {
  constructor(private readonly representService: RepresentService) {}

  @Post()
  create(@Body() createRepresentDto: CreateRepresentDto) {
    return this.representService.create(createRepresentDto);
  }

  @Get()
  findAll() {
    return this.representService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.representService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRepresentDto: UpdateRepresentDto,
  ) {
    return this.representService.update(id, updateRepresentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.representService.remove(id);
  }
}
