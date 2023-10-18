import { PartialType } from '@nestjs/mapped-types';
import { CreateHealtInfoDto } from './create-healt-info.dto';

export class UpdateHealtInfoDto extends PartialType(CreateHealtInfoDto) {}
