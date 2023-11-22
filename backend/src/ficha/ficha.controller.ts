import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FichaService } from './ficha.service';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enum/roles.enum';

@Auth([Role.EDITOR])
@Controller('ficha')
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @Post()
  create(@Body() createFichaDto: CreateFichaDto) {
    return this.fichaService.create(createFichaDto);
  }

  @Get()
  findAll(@Query() querys) {
    return this.fichaService.findAll(querys);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fichaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFichaDto: UpdateFichaDto) {
    return this.fichaService.update(id, updateFichaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fichaService.remove(id);
  }
}
