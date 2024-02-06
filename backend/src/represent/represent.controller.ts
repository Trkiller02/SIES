import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { RepresentService } from './represent.service';
import { CreateRepresentDto } from './dto/create-represent.dto';
import { UpdateRepresentDto } from './dto/update-represent.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/role/enum/roles.enum';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('REPRESENT:')
@Auth([Role.DOCENTES])
@Controller('represent')
export class RepresentController {
  constructor(private readonly representService: RepresentService) {}

  @Post()
  create(@Body() createRepresentDto: CreateRepresentDto) {
    return this.representService.create(createRepresentDto);
  }

  @ApiQuery({
    name: 'deleted',
    required: false,
    type: Boolean,
  })
  @Get()
  findAll(
    @Query('deleted', new ParseBoolPipe({ optional: true }))
    deleted?: boolean | null,
  ) {
    return this.representService.findAll(deleted);
  }

  @ApiQuery({
    name: 'deleted',
    required: false,
    type: Boolean,
  })
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('deleted', new ParseBoolPipe({ optional: true }))
    deleted?: boolean | null,
  ) {
    return this.representService.findOne(id, deleted);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRepresentDto: UpdateRepresentDto,
  ) {
    return this.representService.update(id, updateRepresentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.representService.remove(id);
  }
}
