import { Ficha } from 'src/ficha/entities/ficha.entity';
import { HealthInfo } from 'src/health-info/entities/health-info.entity';
import { Represent } from 'src/represent/entities/represent.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('relation_table')
export class RelationsTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Represent,
    (represent: Represent) => represent.relation_table_represent,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'represent_id' })
  represent_id: string | Represent;

  @OneToOne(() => Ficha, (fichaTable) => fichaTable.relationTable, {
    cascade: true,
  })
  @JoinColumn({ name: 'academic_data_id' })
  ficha_id: string | Ficha;

  @ManyToOne(
    () => Represent,
    (represent: Represent) => represent.relation_table_mother,
    {
      cascade: true,
      nullable: true,
    },
  )
  @JoinColumn({ name: 'mother_id' })
  mother_id?: string | Represent;

  @ManyToOne(
    () => Represent,
    (represent: Represent) => represent.relation_table_father,
    {
      cascade: true,
      nullable: true,
    },
  )
  @JoinColumn({ name: 'father_id' })
  father_id?: string | Represent;

  @OneToOne(() => HealthInfo, (healthTable) => healthTable.relationTable, {
    cascade: true,
  })
  @JoinColumn({ name: 'health_info_id' })
  health_info_id: string | HealthInfo;

  @OneToOne(() => Student, (student) => student.relation_table_id, {
    cascade: true,
  })
  @JoinColumn({ name: 'student_id' })
  student_id: string | Student;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
