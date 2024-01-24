import { Ficha } from 'src/ficha/entities/ficha.entity';
import { HealtInfo } from 'src/healt-info/entities/healt-info.entity';
import { Represent } from 'src/represent/entities/represent.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('relation_table')
export class RelationsTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Represent, (represent: Represent) => represent.person_id, {
    nullable: false,
  })
  @JoinColumn({ name: 'represent_id' })
  represent_id: Represent;

  @OneToOne(() => Ficha, (fichaTable) => fichaTable.id, {
    eager: true,
  })
  @JoinColumn({ name: 'academic_data_id' })
  ficha_id: Ficha;

  @ManyToMany(() => Represent, (represent: Represent) => represent.person_id, {
    nullable: true,
  })
  @JoinColumn({ name: 'mother_id' })
  mother_id?: Represent;

  @ManyToMany(() => Represent, (represent: Represent) => represent.person_id, {
    nullable: true,
  })
  @JoinColumn({ name: 'father_id' })
  father_id?: Represent;

  @OneToOne(() => HealtInfo, (healthTable) => healthTable.id, {
    eager: true,
  })
  @JoinColumn({ name: 'healt_info_id' })
  healt_info_id: HealtInfo;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student_id: Student;
}
