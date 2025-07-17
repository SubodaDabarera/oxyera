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
import {
  ApiResponse,
  ApiSuccessResponse,
} from 'src/common/dto/api-response.dto';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get(':id/remaining-days')
  async getRemainingDays(
    @Param('id') id: string,
  ): Promise<ApiResponse<{ assignmentId: number; remainingDays: number }>> {
    const remainingDays = await this.assignmentsService.getRemainingDays(+id);
    return new ApiSuccessResponse('Remaining days fetched successfully', {
      assignmentId: +id,
      remainingDays,
    });
  }

  @Post()
  async create(
    @Body() data: CreateAssignmentDto,
  ): Promise<ApiResponse<Assignment>> {
    const { patientId, medicationId, ...rest } = data;
    const assignment = await this.assignmentsService.create({
      ...rest,
      patient: { id: patientId } as Patient,
      medication: { id: medicationId } as Medication,
    });
    return new ApiSuccessResponse(
      'Assignment created successfully',
      assignment,
      true,
      201,
    );
  }

  @Get()
  async findAll() {
    const assignments = await this.assignmentsService.findAll();
    return new ApiSuccessResponse(
      'Assignments fetched successfully',
      assignments,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<Assignment | null>> {
    const assignment = await this.assignmentsService.findOne(+id);
    return new ApiSuccessResponse(
      'Assignment fetched successfully',
      assignment,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Assignment>,
  ): Promise<ApiResponse<Assignment | null>> {
    const assignment = await this.assignmentsService.update(+id, data);
    return new ApiSuccessResponse(
      'Assignment updated successfully',
      assignment,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    await this.assignmentsService.remove(+id);
    return new ApiSuccessResponse('Assignment removed successfully');
  }
}
