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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('FICHA:')
@ApiBearerAuth() // método de autorización de Swagger para este controlador
@Auth([Role.EDITOR])
@Controller('ficha') // definiendo el nombre del controlador como 'ficha'
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @ApiBody({ type: CreateFichaDto })
  @Post()
  create(@Body() createFichaDto: CreateFichaDto) {
    // creando una nueva ficha con los datos enviados en el cuerpo de la solicitud
    return this.fichaService.create(createFichaDto);
  }

  @Get()
  findAll(@Query() querys) {
    return this.fichaService.findAll(querys); // obteniendo todas las fichas con los parámetros de consulta enviados en la solicitud
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fichaService.findOne(id); // obteniendo una ficha individual por id
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
