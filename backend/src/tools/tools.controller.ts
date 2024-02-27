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
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ToolsService } from './tools.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { bad_req_err } from 'src/utils/handlerErrors';
import { msgEnum } from 'src/utils/handlerMsg';
import * as path from 'node:path';
import * as multer from 'multer';
import * as fs from 'node:fs';
import { createExcelDto } from './dto/excel-tool-dto';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/role/enum/roles.enum';

@ApiTags('TOOLS:')
@ApiBearerAuth()
@Auth()
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get('planilla/:id')
  async createPlanilla(@Param('id') id: string, @Res() res: Response) {
    const document = await this.toolsService.createPlanillaData(id);

    if (document) {
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=planilla.docx',
      );
      document.getStream().pipe(res);
    } else {
      bad_req_err(msgEnum.bad_req_err, 'Error al procesar la solicitud.');
    }
  }

  @Auth([Role.EVALUACION])
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
  async emptyPlanilla(@Query('etapa') etapa?: string, @Res() res?: Response) {
    const document = await this.toolsService.createEmptyPlanilla(
      etapa?.toUpperCase(),
    );
    if (document) {
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=planilla.docx',
      );
      document.getStream().pipe(res);
    } else {
      bad_req_err(msgEnum.bad_req_err, 'Error al procesar la solicitud.');
    }
  }

  @Get('constancia')
  async emptyConstancia(@Res() res: Response) {
    const data = await this.toolsService.createEmptyConst();

    if (data) {
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=constancia.docx',
      );
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      data.getStream().pipe(res);
    } else {
      bad_req_err(msgEnum.bad_req_err, 'Error al procesar la solicitud.');
    }
  }

  @Get('constancia/:id')
  async createConst(@Param('id') id: string, @Res() res: Response) {
    const data = await this.toolsService.createConstData(id);

    if (data) {
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=constancia.docx',
      );
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      data.getStream().pipe(res);
    } else {
      bad_req_err(msgEnum.bad_req_err, 'Error al procesar la solicitud.');
    }
  }

  @Auth([Role.EVALUACION])
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
  async excelForSearch(
    @Body()
    info: createExcelDto,
    @Res() res: Response,
  ) {
    return await this.toolsService
      .createExcelForSearch(info)
      .then((readStream) => {
        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader(
          'Content-Disposition',
          'attachment; filename=export-data.xlsx',
        );
        readStream.pipe(res);
      })
      .catch((err) => new BadRequestException(err));
  }

  @Get('excel/:id')
  async excelFormatEntity(
    @Param('id')
    info: string,
    @Res() res: Response,
  ) {
    return await this.toolsService
      .createExcelInfo(info)
      .then((readStream) => {
        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader(
          'Content-Disposition',
          'attachment; filename=export-data.xlsx',
        );
        readStream.pipe(res);
      })
      .catch((err) => new BadRequestException(err));
  }

  // RETORNAR PLANILLA SIN FORMATO DE EJEMPLO
  @Post('planilla/examples')
  async examplePlanilla(@Res() res: Response) {
    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'templatePlanilla.docx',
    );

    try {
      const file = fs.createReadStream(dir);

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=example.docx');

      file.pipe(res);
    } catch (error) {
      bad_req_err(msgEnum.bad_req_err, (error as Error).message);
    }
  }

  @Post('constancia/example')
  async exampleConstancia(@Res() res: Response) {
    const dir = path.join(
      process.cwd(),
      'src',
      'utils',
      'templates',
      'templateConstancia.docx',
    );

    try {
      const file = await fs.createReadStream(dir);

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=exampleConstancia.docx',
      );

      file.pipe(res);
    } catch (error) {
      bad_req_err(msgEnum.bad_req_err, (error as Error).message);
    }
  }
}
