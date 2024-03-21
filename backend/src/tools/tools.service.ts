import { Injectable, StreamableFile } from '@nestjs/common';
import createReport from 'docx-templates';
import { Readable } from 'node:stream';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as excelJS from 'exceljs';

//handlers
import { bad_req_err } from 'src/utils/handlerErrors';
import { msgEnum } from 'src/utils/handlerMsg';

//services
import { RelationsTableService } from 'src/relations-table/relations-table.service';
import { RepresentService } from 'src/represent/represent.service';
import { FichaService } from 'src/ficha/ficha.service';
import { UserService } from 'src/user/user.service';

//dto
import { createExcelDto } from './dto/excel-tool-dto';

//entities
import { Represent } from 'src/represent/entities/represent.entity';
import { Student } from 'src/student/entities/student.entity';
import { Ficha } from 'src/ficha/entities/ficha.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';

//utils
import {
  headerStyle,
  healthColumns,
  representColumns,
  studentColumns,
  userColumns,
} from 'src/utils/listColumnsExcel';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class ToolsService {
  constructor(
    private readonly tableService: RelationsTableService,
    private readonly userService: UserService,
    private readonly representService: RepresentService,
    private readonly fichaInfoService: FichaService,
  ) {}

  async createConstData(id: string) {
    const data = await this.tableService.findOne(id);

    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'templateConstancia.docx',
    );

    try {
      const template = await fs.readFile(dir);

      const buffer = await createReport({
        template,
        data: data,
        cmdDelimiter: ['{#', '#}'],
      });

      return new StreamableFile(buffer);
    } catch (error) {
      bad_req_err(msgEnum.bad_req_err, (error as Error).message);
    }
  }

  async createEmptyConst() {
    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'templateConstancia.docx',
    );

    try {
      const template = await fs.readFile(dir);

      const data = {
        ficha_id: null,
        health_info_id: null,
        student_id: null,
        represent_id: null,
        mother_id: null,
        father_id: null,
      };

      const buffer = await createReport({
        template,
        data: data,
        cmdDelimiter: ['{#', '#}'],
      });

      return new StreamableFile(buffer);
    } catch (error) {
      bad_req_err(msgEnum.bad_req_err, (error as Error).message);
    }
  }

  // CREA LA PLANILLA OBTENIENDO LOS DATOS NECESARIOS
  async createPlanillaData(id: string) {
    const data = await this.tableService.findOne(id);

    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'templatePlanilla.docx',
    );

    try {
      const template = await fs.readFile(dir);

      const buffer = await createReport({
        template,
        data: data,

        cmdDelimiter: ['{#', '#}'],
      });

      return new StreamableFile(buffer);
    } catch (error) {
      bad_req_err(msgEnum.bad_req_err, (error as Error).message);
    }
  }

  async createEmptyPlanilla(etapa: string) {
    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'templatePlanilla.docx',
    );

    try {
      const template = await fs.readFile(dir);

      const year = new Date().getFullYear();

      if (!template)
        bad_req_err(
          msgEnum.bad_req_err,
          'No se encontró el archivo de plantilla.',
        );

      const data = {
        ficha_id: {
          etapa: etapa,
          escolar_period: `${year} - ${year + 1}`,
        },
        health_info_id: null,
        student_id: null,
        represent_id: null,
        mother_id: null,
        father_id: null,
      };

      const buffer = await createReport({
        template,
        data: data,
        cmdDelimiter: ['{#', '#}'],
      });

      return new StreamableFile(buffer);
    } catch (e) {
      bad_req_err(msgEnum.bad_req_err, (e as Error).message);
    }
  }

  // CREAR EXCEL DE QUERY
  async createExcelForSearch(info: createExcelDto): Promise<Readable> {
    if (!info)
      bad_req_err(msgEnum.bad_req_err, 'No hay parametros de busqueda.');

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
      sheet.columns = userColumns;

      sheet.eachRow((row, rowNumber) => {
        sheet.columns.forEach((columna) => {
          const celda = row.getCell(columna.key);
          if (celda) {
            celda.style = headerStyle;
          }
        });
      });

      const user: User | User[] = info.id
        ? await this.userService.findOne(info.id)
        : await this.userService.findAll();

      if (!user) bad_req_err(msgEnum.not_found, 'No se encuentro registro(s).');

      if (user instanceof Array) {
        user.map((value, idx) => {
          sheet.addRow({ ...value, role_id: (value.role_id as Role).name });
        });
      } else {
        sheet.addRow({ ...user, role_id: (user.role_id as Role).name });
      }

      const buffer = await excel.xlsx.writeBuffer();

      readStream.push(buffer);

      readStream.push(null);

      return readStream;
    }

    if (info.entity === 'represent') {
      sheet.columns = representColumns;

      sheet.eachRow((row, rowNumber) => {
        sheet.columns.forEach((columna) => {
          const celda = row.getCell(columna.key);
          if (celda) {
            celda.style = headerStyle;
          }
        });
      });

      const represent: Represent | Represent[] = info.id
        ? await this.representService.findOne(info.id)
        : await this.representService.findAll();

      if (!represent)
        bad_req_err(msgEnum.not_found, 'No se encuentro registro(s).');

      if (represent instanceof Array) {
        represent.map((value, idx) => {
          sheet.addRow({ ...value, ...(value.person_id as Person) });
        });
      } else {
        sheet.addRow({ ...represent, ...(represent.person_id as Person) });
      }

      const buffer = await excel.xlsx.writeBuffer();

      readStream.push(buffer);

      readStream.push(null);

      return readStream;
    }

    if (info.entity === 'student' && info.etapa) {
      sheet.columns = studentColumns;

      sheet.eachRow((row, rowNumber) => {
        sheet.columns.forEach((columna) => {
          const celda = row.getCell(columna.key);
          if (celda) {
            celda.style = headerStyle;
          }
        });
      });

      const ficha: Ficha | Ficha[] = info.id
        ? await this.fichaInfoService.findOne(info.id)
        : await this.fichaInfoService.findAll(
            info.etapa,
            info.deleted,
            info.section,
            info.level,
          );

      if (ficha instanceof Array) {
        ficha.map((value, idx) => {
          sheet.addRow({
            ...value,
            ...(value.relationTable.student_id as Student),
            ...((value.relationTable.student_id as Student)
              .person_id as Person),
            level:
              value.level === 8
                ? 'PREESCOLAR INICIAL'
                : value.level === 9
                  ? 'PREESCOLAR AVANZADO'
                  : value.level,
          });
        });
      } else {
        sheet.addRow({
          ...ficha,
          ...(ficha.relationTable.student_id as Student),
          ...((ficha.relationTable.student_id as Student).person_id as Person),
        });
      }

      const buffer = await excel.xlsx.writeBuffer();

      readStream.push(buffer);

      readStream.push(null);

      return readStream;
    }
  }

  //CREAR EXCEL DE UN ESTUDIANTE ESPECIFICO
  async createExcelInfo(id): Promise<Readable> {
    const {
      student_id,
      represent_id,
      health_info_id,
      ficha_id,
      mother_id,
      father_id,
    } = await this.tableService.findOne(id);

    const readStream = new Readable();

    readStream._read = () => {};

    const excel = new excelJS.Workbook();

    const sheetStudent = excel.addWorksheet('Estudiante');
    const sheetSalud = excel.addWorksheet('Salud-Estudiante');
    const sheetRepresent = excel.addWorksheet('Representantes');

    if (student_id) {
      sheetStudent.columns = studentColumns;

      sheetStudent.eachRow((row, rowNumber) => {
        sheetStudent.columns.forEach((columna) => {
          const celda = row.getCell(columna.key);
          if (celda) {
            celda.style = headerStyle;
          }
        });
      });

      sheetStudent.addRow({
        ...(student_id as Student),
        ...(ficha_id as Ficha),
        ...((student_id as Student).person_id as Person),
        level:
          (ficha_id as Ficha).level === 8
            ? 'PREESCOLAR INICIAL'
            : (ficha_id as Ficha).level === 9
              ? 'PREESCOLAR AVANZADO'
              : (ficha_id as Ficha).level,
      });
    }

    if (represent_id || mother_id || father_id) {
      sheetRepresent.columns = representColumns;

      sheetRepresent.eachRow((row, rowNumber) => {
        sheetRepresent.columns.forEach((columna) => {
          const celda = row.getCell(columna.key);
          if (celda) {
            celda.style = headerStyle;
          }
        });
      });

      if (represent_id) {
        sheetRepresent.addRow({
          ...(represent_id as Represent),
          ...((represent_id as Represent).person_id as Person),
        });
      }

      if (mother_id) {
        sheetRepresent.addRow({
          ...(mother_id as Represent),
          ...((mother_id as Represent).person_id as Person),
        });
      }

      if (father_id) {
        sheetRepresent.addRow({
          ...(father_id as Represent),
          ...((father_id as Represent).person_id as Person),
        });
      }
    }

    if (health_info_id) {
      sheetSalud.columns = healthColumns;

      sheetSalud.eachRow((row, rowNumber) => {
        sheetSalud.columns.forEach((columna) => {
          const celda = row.getCell(columna.key);
          if (celda) {
            celda.style = headerStyle;
          }
        });
      });

      sheetSalud.addRow(health_info_id);
    }

    const buffer = await excel.xlsx.writeBuffer();

    readStream.push(buffer);

    readStream.push(null);

    return readStream;
  }
}
