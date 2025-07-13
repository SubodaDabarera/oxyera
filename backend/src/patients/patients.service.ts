import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepo: Repository<Patient>,
  ) {}

  create(data: Partial<Patient>): Promise<Patient> {
    const patient = this.patientsRepo.create(data);
    return this.patientsRepo.save(patient);
  }

  findAll(): Promise<Patient[]> {
    return this.patientsRepo.find();
  }

  findOne(id: number): Promise<Patient | null> {
    return this.patientsRepo.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Patient>): Promise<Patient | null> {
    await this.patientsRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.patientsRepo.delete(id);
  }
}
