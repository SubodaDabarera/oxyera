import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentsService } from '../assignments.service';
import { Assignment } from '../assignment.entity';

describe('AssignmentsService calculateRemainingDays', () => {
  let service: AssignmentsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AssignmentsService,
        {
          provide: getRepositoryToken(Assignment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = moduleRef.get(AssignmentsService);
  });

  it('computes startDate + duration - today', () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 5);
    const duration = 10; // ends in 5 days
    const remaining = service.calculateRemainingDays(
      start.toISOString(),
      duration,
    );
    expect(remaining).toBe(5);
  });
});
