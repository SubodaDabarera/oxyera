import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentsRepo: Repository<Assignment>,
  ) {}

  create(data: Partial<Assignment>): Promise<Assignment> {
    const assignment = this.assignmentsRepo.create(data);
    return this.assignmentsRepo.save(assignment);
  }

  findAll(): Promise<Assignment[]> {
    return this.assignmentsRepo.find({ relations: ['patient', 'medication'] });
  }

  findOne(id: number): Promise<Assignment | null> {
    return this.assignmentsRepo.findOne({
      where: { id },
      relations: ['patient', 'medication'],
    });
  }

  async update(
    id: number,
    data: Partial<Assignment>,
  ): Promise<Assignment | null> {
    await this.assignmentsRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.assignmentsRepo.delete(id);
  }
}
