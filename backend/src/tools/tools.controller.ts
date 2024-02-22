import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  BadRequestException,
  Query,
  Header,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ToolsService } from './tools.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { bad_req_err } from 'src/utils/handlerErrors';
import { messagesEnum } from 'src/utils/handlerMsg';
import * as path from 'node:path';
import * as multer from 'multer';
import * as fs from 'node:fs';
import { createExcelDto } from './dto/excel-tool-dto';
import { Response } from 'express';

@ApiTags('TOOLS:')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get('planilla/:id')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename=planilla.docx')
  async createPlanilla(@Param('id') id: string) {
    return await this.toolsService.createPlanillaData(id);
  }

  @Post('planilla/update')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (
          file.mimetype !==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          return callback(
            new BadRequestException(
              'Formato no soportado. Se espera un documento con terminación (.docx)',
            ),
            false,
          );
        }
        return callback(null, true);
      },
      storage: multer.diskStorage({
        destination: path.join(process.cwd(), 'src', 'utils', 'templates'),
        filename: (req, file, callback) => {
          return callback(null, 'templatePlanilla.docx');
        },
      }),
    }),
  )
  updatePlanilla(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return 'Actualización completa.';
  }

  // OBTENER LA PLANILLA
  @ApiQuery({
    name: 'etapa',
    enum: ['EDUCACION MEDIA', 'EDUCACION PRIMARIA'],
  })
  @Get('planilla')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename=planilla.docx')
  async emptyPlanilla(@Query('etapa') etapa?: string) {
    return await this.toolsService.createEmptyPlanilla(etapa?.toUpperCase());
  }

  @Get('constancia')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename=constancia.docx')
  async emptyConstancia() {
    return await this.toolsService.createEmptyConst();
  }

  @Get('constancia/:id')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename=constancia.docx')
  async createConst(@Param('id') id: string) {
    return await this.toolsService.createConstData(id);
  }

  @Post('constancia/update')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (
          file.mimetype !==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          return callback(
            new BadRequestException(
              'Formato no soportado. Se espera un documento con terminación (.docx)',
            ),
            false,
          );
        }
        return callback(null, true);
      },
      storage: multer.diskStorage({
        destination: path.join(process.cwd(), 'src', 'utils', 'templates'),
        filename: (req, file, callback) => {
          return callback(null, 'templateConstancia.docx');
        },
      }),
    }),
  )
  updateConstancia(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return 'Actualización completa.';
  }

  @Post('excel')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename=export-data.xlsx')
  async excelForSearch(
    @Body()
    info: createExcelDto,
    @Res() res: Response,
  ) {
    return await this.toolsService
      .createExcelForSearch(info)
      .then((readStream) => readStream.pipe(res))
      .catch((err) => new BadRequestException(err));
  }

  @Post('excel/:id')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename=export-data.xlsx')
  async excelFormatEntity(
    @Param('id')
    info: string,
    @Res() res: Response,
  ) {
    return await this.toolsService
      .createExcelInfo(info)
      .then((readStream) => readStream.pipe(res))
      .catch((err) => new BadRequestException(err));
  }

  // RETORNAR PLANILLA SIN FORMATO DE EJEMPLO
  @Get('planilla/example')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename=example.docx')
  examplePlanilla() {
    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'templatePlanilla.docx',
    );

    const file = fs.createReadStream(dir);

    if (!file)
      bad_req_err(messagesEnum.bad_req_err, 'No se encontró la plantilla.');

    return new StreamableFile(file);
  }

  @Get('constancia/example')
  @Header('Content-Type', 'application/vnd.ms-word')
  @Header('Content-Disposition', 'attachment; filename=example.docx')
  exampleConstancia() {
    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'templateConstancia.doc',
    );

    const file = fs.createReadStream(dir);

    if (!file)
      bad_req_err(messagesEnum.bad_req_err, 'No se encontró la plantilla.');

    return new StreamableFile(file);
  }
}
