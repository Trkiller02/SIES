import { PartialType } from '@nestjs/swagger';
import { CreateHealthInfoDto } from './create-health-info.dto';

export class UpdateHealthInfoDto extends PartialType(CreateHealthInfoDto) {}
