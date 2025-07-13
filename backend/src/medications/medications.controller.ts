import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { Medication } from './medication.entity';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  create(@Body() data: Partial<Medication>) {
    return this.medicationsService.create(data);
  }

  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Medication>) {
    return this.medicationsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationsService.remove(+id);
  }
}
