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
import { CreateMedicationDto } from './dto/create-medication.dto';
import {
  ApiResponse,
  ApiSuccessResponse,
} from 'src/common/dto/api-response.dto';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  async create(
    @Body() data: CreateMedicationDto,
  ): Promise<ApiResponse<Medication>> {
    const medication = await this.medicationsService.create(data);
    return new ApiSuccessResponse(
      'Medication created successfully',
      medication,
      true,
      201,
    );
  }

  @Get()
  async findAll(): Promise<ApiResponse<Medication[]>> {
    const medications = await this.medicationsService.findAll();
    return new ApiSuccessResponse(
      'Medications fetched successfully',
      medications,
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ApiResponse<Medication | null>> {
    const medication = await this.medicationsService.findOne(+id);
    return new ApiSuccessResponse(
      'Medication fetched successfully',
      medication,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Medication>,
  ): Promise<ApiResponse<Medication | null>> {
    const medication = await this.medicationsService.update(+id, data);
    return new ApiSuccessResponse(
      'Medication updated successfully',
      medication,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<{} | null>> {
    await this.medicationsService.remove(+id);
    return new ApiSuccessResponse('Medication removed successfully', {}, true);
  }
}
