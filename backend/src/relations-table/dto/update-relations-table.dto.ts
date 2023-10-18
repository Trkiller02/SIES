import { PartialType } from '@nestjs/mapped-types';
import { CreateRelationsTableDto } from './create-relations-table.dto';

export class UpdateRelationsTableDto extends PartialType(CreateRelationsTableDto) {}
