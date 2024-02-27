import { Person } from 'src/person/entities/person.entity';
import { RelationsTable } from 'src/relations-table/entities/relations-table.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
  Entity,
} from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Person, (person) => person.relationStudent, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'person_id' })
  person_id: string | Person;

  @Column()
  age?: number;

  @Column()
  born_place: string;

  @Column()
  born_state: string;

  @Column()
  born_municipio: string;

  @Column()
  born_parroquia: string;

  @Column()
  born_pais: string;

  @Column()
  born_date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @OneToOne(() => RelationsTable, (relationTable) => relationTable.student_id)
  relation_table_id?: RelationsTable;
}
