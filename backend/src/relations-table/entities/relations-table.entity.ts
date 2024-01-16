import { Represent } from 'src/represent/entities/represent.entity';
import { Student } from 'src/student/entities/student.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('relation_table')
export class RelationsTable {
  @ManyToOne(() => Represent, (represent: Represent) => represent.ciNumber)
  representCiNumbers: Represent;

  fichaId: string;

  @ManyToOne(() => Represent, (represent: Represent) => represent.ciNumber)
  motherPersonCiNumbers?: string;

  @ManyToOne(() => Represent, (represent: Represent) => represent.ciNumber)
  fatherPersonCiNumbers?: string;

  @ManyToOne(() => Represent, (represent: Represent) => represent.ciNumber)
  statusId: string;

  @OneToOne((type) => Student)
  studentId: Student;
}
