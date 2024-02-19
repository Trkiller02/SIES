import { Header, Injectable, StreamableFile } from '@nestjs/common';
import { RelationsTableService } from 'src/relations-table/relations-table.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { bad_req_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';
import createReport from 'docx-templates';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as excelJS from 'exceljs';
import { UserService } from 'src/user/user.service';
import { RepresentService } from 'src/represent/represent.service';
import { StudentService } from 'src/student/student.service';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { createExcelDto } from './dto/excel-tool-dto';
import { Readable } from 'node:stream';

@Injectable()
export class ToolsService {
  constructor(
    private readonly tableService: RelationsTableService,
    private readonly userService: UserService,
    private readonly representService: RepresentService,
    private readonly studentService: StudentService,
  ) {}
  // CREA LA PLANILLA OBTENIENDO LOS DATOS NECESARIOS
  async createInfoData(createDto: CreateToolDto) {
    const data = await this.tableService.findOne(createDto.id);

    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'templates.docx',
    );
    const template = await fs.readFile(dir);

    const buffer = await createReport({
      template,
      data: data,
    });

    return buffer;
  }

  async createPlanilla(etapa: string) {
    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'template.docx',
    );

    const template = await fs.readFile(dir);

    const year = new Date().getFullYear();

    if (!template)
      bad_req_err(
        messagesEnum.bad_req_err,
        'No se encontró el archivo de plantilla.',
      );

    const data = {
      ficha_id: {
        etapa: etapa === 'EM' ? 'AÑO' : etapa === 'EP' ? 'GRADO' : 'GRADO',
        escolar_period: `${year} - ${year + 1}`,
      },
    };

    const buffer = await createReport({
      template,
      data: data,
      cmdDelimiter: ['{#', '#}'],
    });

    return new StreamableFile(buffer);
  }

  async createExcel(info: createExcelDto): Promise<Readable> {
    const sheetName =
      info.entity === 'user'
        ? 'Usuarios'
        : info.entity === 'represent'
          ? 'Representantes'
          : info.entity === 'student'
            ? 'Estudiantes'
            : 'Personas';

    const readStream = new Readable();

    readStream._read = () => {};

    const excel = new excelJS.Workbook();

    const sheet = excel.addWorksheet(sheetName);

    if (info.entity === 'user') {
      sheet.columns = [
        { header: 'Nombre', key: 'name', width: 25 },
        { header: 'Apellido', key: 'lastname', width: 25 },
        { header: 'Correo Electronico', key: 'email', width: 25 },
        { header: 'C.I.', key: 'ci_number', width: 25 },
        { header: 'Rol', key: 'role_id', width: 25 },
      ];

      const user: User | User[] = info.id
        ? await this.userService.findOne(info.id)
        : await this.userService.findAll();

      if (user instanceof Array) {
        user.map((value, idx) => {
          sheet.addRow({
            name: value.name,
            lastname: value.lastname,
            email: value.email ? value.email : 'NO POSEE',
            ci_number: value.ci_number,
            role_id:
              value.role_id instanceof Role
                ? value.role_id.name
                : value.role_id,
          });
        });

        const buffer = await excel.xlsx.writeBuffer({ filename: 'user-data' });

        readStream.push(buffer);

        readStream.push(null);

        return readStream;
      }

      sheet.addRow({
        name: user.name,
        lastname: user.lastname,
        email: user.email ? user.email : 'NO POSEE',
        ci_number: user.ci_number,
        role_id:
          user.role_id instanceof Role ? user.role_id.name : user.role_id,
      });

      const buffer = await excel.xlsx.writeBuffer({ filename: 'user-data' });

      readStream.push(buffer);

      readStream.push(null);

      return readStream;
    }
  }
}
