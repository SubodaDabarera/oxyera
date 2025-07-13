import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Medication } from '../medications/medication.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: string;

  @Column('int')
  duration: number; 

  @ManyToOne(() => Patient, (patient) => patient.assignments)
  patient: Patient;

  @ManyToOne(() => Medication, (medication) => medication.assignments)
  medication: Medication;
}
