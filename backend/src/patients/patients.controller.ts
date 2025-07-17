import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import {
  ApiResponse,
  ApiSuccessResponse,
} from 'src/common/dto/api-response.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body() data: CreatePatientDto): Promise<ApiResponse<Patient>> {
    const patient = await this.patientsService.create(data);
    return new ApiSuccessResponse('Patient created successfully', patient);
  }

  @Get()
  async findAll(): Promise<ApiResponse<Patient[]>> {
    const patients = await this.patientsService.findAll();
    return new ApiSuccessResponse('Patients fetched successfully', patients);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Patient | null>> {
    const patient = await this.patientsService.findOne(+id);
    return new ApiSuccessResponse('Patient fetched successfully', patient);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Patient>,
  ): Promise<ApiResponse<Patient | null>> {
    const patient = await this.patientsService.update(+id, data);
    return new ApiSuccessResponse('Patient updated successfully', patient);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<{} | null>> {
    await this.patientsService.remove(+id);
    return new ApiSuccessResponse('Patient removed successfully', {});
  }
}
