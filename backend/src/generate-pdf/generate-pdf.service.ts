import { Injectable } from '@nestjs/common';
import { join } from 'path';
const PDFDocument = require('pdfkit-table');

@Injectable()
export class GeneratePdfService {
  async generatePdf(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      doc.fontSize(11);
      doc.on('pageAdded', () => {
        doc.image(
          join(process.cwd(), '/public/pdf-images/image2.jpg'),
          22,
          25,
          { fit: [145, 145], align: 'center' },
        );
        doc.text('U.E.P. "Espíritu Santo"', doc.page.width / 2 - 40, 40);
        doc.text('Código de Plantel', doc.page.width / 2 - 40);
        doc.text('PDO2941406', doc.page.width / 2 - 40);
        doc.image(
          join(process.cwd(), '/public/pdf-images/image1.png'),
          doc.page.width - 100,
          20,
          { fit: [75, 75], align: 'center' },
        );
      });

      console.log(doc.page.width / 6 - 80);

      doc.text('PDF GENERATED IN OUR SERVER');
      doc.moveDown();
      doc.text('Test controller');
      doc.addPage();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
      doc.end();
    });
    return pdfBuffer;
  }
}
