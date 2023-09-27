import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { Person as PersonModel } from '@prisma/client';

@Auth([Role.EDITOR])
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto): Promise<PersonModel> {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll(): Promise<PersonModel[]> {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PersonModel> {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<PersonModel> {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PersonModel> {
    return this.personService.remove(id);
  }
}
