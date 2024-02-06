import { PartialType } from '@nestjs/swagger';
import { CreateRepresentDto } from './create-represent.dto';

export class UpdateRepresentDto extends PartialType(CreateRepresentDto) {}
