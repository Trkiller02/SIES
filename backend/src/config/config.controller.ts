import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
