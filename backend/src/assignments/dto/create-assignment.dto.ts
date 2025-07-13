import { IsInt, Min, IsDateString } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  patientId: number;

  @IsInt()
  medicationId: number;

  @IsDateString()
  startDate: string;

  @IsInt()
  @Min(1)
  duration: number;
}
