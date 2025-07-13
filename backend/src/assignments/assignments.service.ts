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

  async findOne(id: number): Promise<Assignment | null> {
    const assignment = await this.assignmentsRepo.findOne({ where: { id } });
    return assignment;
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

  calculateRemainingDays(startDate: string, duration: number): number {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + duration);
    const today = new Date();
    // Clear time portion for comparison
    const diff = end.getTime() - today.setHours(0, 0, 0, 0);
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  }

  async getRemainingDays(id: number): Promise<number> {
    const assignment = await this.findOne(id);
    return this.calculateRemainingDays(assignment.startDate, assignment.duration);
  }
}
