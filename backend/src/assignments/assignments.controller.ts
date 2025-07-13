import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Patient } from 'src/patients/patient.entity';
import { Medication } from 'src/medications/medication.entity';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get(':id/remaining-days')
  async getRemainingDays(@Param('id') id: string) {
    const remainingDays = await this.assignmentsService.getRemainingDays(+id);
    return { assignmentId: +id, remainingDays };
  }

  @Post()
  create(@Body() data: CreateAssignmentDto) {
    const { patientId, medicationId, ...rest } = data;
    return this.assignmentsService.create({
      ...rest,
      patient: { id: patientId } as Patient,
      medication: { id: medicationId } as Medication,
    });
  }

  @Get()
  findAll() {
    return this.assignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Assignment>) {
    return this.assignmentsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(+id);
  }
}
