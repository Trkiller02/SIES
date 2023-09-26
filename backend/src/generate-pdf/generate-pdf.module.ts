import { Module } from '@nestjs/common';
import { GeneratePdfService } from './generate-pdf.service';
import { GeneratePdfController } from './generate-pdf.controller';

@Module({
  controllers: [GeneratePdfController],
  providers: [GeneratePdfService]
})
export class GeneratePdfModule {}
