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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateToolDto } from './dto/create-tool.dto';
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

  @Post('data')
  async create(@Body() createToolDto: CreateToolDto) {
    return await this.toolsService.createInfoData(createToolDto);
  }

  @Post('upload')
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
          return callback(null, 'template.docx');
        },
      }),
    }),
  )
  upload(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return 'Actualización completa.';
  }

  // OBTENER LA PLANILLA
  @ApiQuery({
    name: 'etapa',
    enum: ['EM', 'EP'],
  })
  @Get()
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename=planilla.docx')
  async planilla(@Query('etapa') etapa?: string) {
    return await this.toolsService.createPlanilla(etapa?.toUpperCase());
  }

  @Post('excel')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename=export-data.xlsx')
  async excel(
    @Body()
    info: createExcelDto,
    @Res() res: Response,
  ) {
    return await this.toolsService
      .createExcel(info)
      .then((readStream) => readStream.pipe(res));
  }

  // RETORNAR PLANILLA SIN FORMATO DE EJEMPLO
  @Get('example')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename=example.docx')
  example() {
    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'template.docx',
    );

    const file = fs.createReadStream(dir);

    if (!file)
      bad_req_err(messagesEnum.bad_req_err, 'No se encontró la plantilla.');

    return new StreamableFile(file);
  }
}
