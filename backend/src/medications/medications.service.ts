import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from './medication.entity';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private medicationsRepo: Repository<Medication>,
  ) {}

  create(data: Partial<Medication>): Promise<Medication> {
    const medication = this.medicationsRepo.create(data);
    return this.medicationsRepo.save(medication);
  }

  findAll(): Promise<Medication[]> {
    return this.medicationsRepo.find();
  }

  findOne(id: number): Promise<Medication | null> {
    return this.medicationsRepo.findOne({ where: { id } });
  }

  async update(
    id: number,
    data: Partial<Medication>,
  ): Promise<Medication | null> {
    await this.medicationsRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.medicationsRepo.delete(id);
  }
}
