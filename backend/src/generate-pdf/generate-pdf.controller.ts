import { Controller, Get, Res } from '@nestjs/common';
import { GeneratePdfService } from './generate-pdf.service';

@Controller('generate-pdf')
export class GeneratePdfController {
  constructor(private readonly generatePdfService: GeneratePdfService) {}

  @Get()
  async downloadPdf(@Res() res) {
    const buffer = await this.generatePdfService.generatePdf();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
