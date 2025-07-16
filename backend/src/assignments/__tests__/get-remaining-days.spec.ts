import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentsService } from '../assignments.service';
import { Assignment } from '../assignment.entity';
import { NotFoundException } from '@nestjs/common';

describe('AssignmentsService getRemainingDays', () => {
  let service: AssignmentsService;
  let repo: jest.Mocked<Repository<Assignment>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AssignmentsService,
        {
          provide: getRepositoryToken(Assignment),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(AssignmentsService);
    repo = moduleRef.get(getRepositoryToken(Assignment));
  });

  it('returns remaining days when assignment exists', async () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 2);
    const assignment: Assignment = {
      id: 1,
      startDate: start.toISOString(),
      duration: 5,
      patient: {} as any,
      medication: {} as any,
    };
    (repo.findOne as jest.Mock).mockResolvedValue(assignment);
    const remaining = await service.getRemainingDays(1);
    expect(remaining).toBe(
      service.calculateRemainingDays(assignment.startDate, assignment.duration),
    );
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('throws NotFoundException when assignment is missing', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    await expect(service.getRemainingDays(2)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
