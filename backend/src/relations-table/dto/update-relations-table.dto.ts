import { PartialType } from '@nestjs/swagger';
import { CreateRelationsTableDto } from './create-relations-table.dto';

export class UpdateRelationsTableDto extends PartialType(
  CreateRelationsTableDto,
) {}
