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
  ParseIntPipe,
} from '@nestjs/common';
import { FichaService } from './ficha.service';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/role/enum/roles.enum';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('ACADEMIC-INFO:')
@ApiBearerAuth() // método de autorización de Swagger para este controlador
@Auth([Role.DOCENTES])
@Controller('ficha') // definiendo el nombre del controlador como 'ficha'
export class FichaController {
  constructor(private readonly fichaService: FichaService) {}

  @ApiBody({ type: CreateFichaDto })
  @Post()
  create(@Body() createFichaDto: CreateFichaDto) {
    // creando una nueva ficha con los datos enviados en el cuerpo de la solicitud
    return this.fichaService.create(createFichaDto);
  }

  @ApiQuery({
    name: 'section',
    required: false,
    type: String,
    schema: {
      maxLength: 1,
    },
  })
  @ApiQuery({
    name: 'level',
    required: false,
    type: Number,
    schema: {
      maximum: 6,
      minimum: 1,
    },
  })
  @ApiQuery({
    name: 'deleted',
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'etapa',
    required: false,
    isArray: true,
    enum: ['EDUCACION MEDIA GENERAL', 'EDUCACION PRIMARIA'],
  })
  @Get()
  findAll(
    @Query('etapa')
    etapa?: string | null,
    @Query('deleted', new ParseBoolPipe({ optional: true }))
    deleted?: boolean | null,
    @Query('section')
    section?: string | null,
    @Query('level', new ParseIntPipe({ optional: true }))
    level?: number | null,
  ) {
    return this.fichaService.findAll(etapa, deleted, section, level); // obteniendo todas las fichas con los parámetros de consulta enviados en la solicitud
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
