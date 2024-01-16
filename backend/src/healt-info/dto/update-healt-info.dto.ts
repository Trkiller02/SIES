import { PartialType } from '@nestjs/swagger';
import { CreateHealtInfoDto } from './create-healt-info.dto';

export class UpdateHealtInfoDto extends PartialType(CreateHealtInfoDto) {}
