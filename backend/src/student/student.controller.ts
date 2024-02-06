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
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/role/enum/roles.enum';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

// CONTROLADOR DEL RECURSO PROTEGIDO
// ACCESO RESTRINGIDO PARA USUARIO COMÚN
@ApiTags('STUDENT:')
@ApiBearerAuth()
@Auth([Role.DOCENTES])
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // RUTA PARA CREAR
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  // RUTA PARA OBTENER TODOS LOS REGISTROS

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  // RUTA PARA OBTENER UN REGISTRO ESPECIFICO
  @ApiParam({ name: 'id', type: String })
  @ApiQuery({
    name: 'deleted',
    required: false,
    type: Boolean,
  })
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('deleted', new ParseBoolPipe({ optional: true }))
    deleted?: boolean | null,
  ) {
    return this.studentService.findOne(id, deleted);
  }

  // RUTA PARA ACTUALIZAR UN REGISTRO ESPECIFICO
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  // RUTA PARA ELIMINAR UN REGISTRO ESPECIFICO
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
