import { PartialType } from '@nestjs/mapped-types';
import { CreateRepresentDto } from './create-represent.dto';

export class UpdateRepresentDto extends PartialType(CreateRepresentDto) {}
