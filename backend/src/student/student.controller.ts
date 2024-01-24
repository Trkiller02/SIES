import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enum/roles.enum';

// CONTROLADOR DEL RECURSO PROTEGIDO
// ACCESO RESTRINGIDO PARA USUARIO COMÚN
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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  // RUTA PARA ACTUALIZAR UN REGISTRO ESPECIFICO
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  // RUTA PARA ELIMINAR UN REGISTRO ESPECIFICO
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
