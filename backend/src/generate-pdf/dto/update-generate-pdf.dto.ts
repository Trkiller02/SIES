import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneratePdfDto } from './create-generate-pdf.dto';

export class UpdateGeneratePdfDto extends PartialType(CreateGeneratePdfDto) {}
