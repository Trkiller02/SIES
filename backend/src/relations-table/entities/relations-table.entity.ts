import { Ficha } from 'src/ficha/entities/ficha.entity';
import { HealtInfo } from 'src/healt-info/entities/healt-info.entity';
import { Represent } from 'src/represent/entities/represent.entity';
import { Student } from 'src/student/entities/student.entity';
import {
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

  @ManyToOne(() => Represent, (represent: Represent) => represent.ciNumber, {
    eager: true,
  })
  @JoinColumn()
  represent_id?: Represent;

  @OneToOne(() => Ficha, (fichaTable) => fichaTable.id, {
    eager: true,
  })
  @JoinColumn()
  ficha_id: string;

  @ManyToOne(() => Represent, (represent: Represent) => represent.ciNumber, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  mother_id?: string;

  @ManyToOne(() => Represent, (represent: Represent) => represent.ciNumber, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  father_id?: string;

  @OneToOne(() => HealtInfo, (healthTable) => healthTable.id, {
    eager: true,
  })
  @JoinColumn()
  healt_info_id: string;

  @OneToOne(() => Student, {
    eager: true,
  })
  @JoinColumn()
  student_id: Student;
}
