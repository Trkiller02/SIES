import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { RelationsTable } from 'src/relations-table/entities/relations-table.entity';

@Entity('represent')
export class Represent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Person, (person) => person.relationRepresent, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'person_id' })
  person_id: string | Person;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    default: 'NO POSEE',
  })
  profession?: string;

  @Column({
    type: 'varchar',
    length: 14,
    nullable: true,
    default: 'NO POSEE',
  })
  tlfn_home?: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
    default: 'NO POSEE',
  })
  work_place?: string;

  @Column({
    type: 'varchar',
    length: 14,
    nullable: true,
    default: 'NO POSEE',
  })
  work_phone_number?: string;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
  })
  income_month?: number;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  rl: boolean;

  @DeleteDateColumn()
  deleted_at?: Date | null;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at?: Date;

  @OneToMany(
    () => RelationsTable,
    (relation_table) => relation_table.represent_id,
  )
  relation_table_represent: RelationsTable;

  @OneToMany(
    () => RelationsTable,
    (relation_table) => relation_table.mother_id,
    { nullable: true },
  )
  relation_table_mother?: RelationsTable;

  @OneToMany(
    () => RelationsTable,
    (relation_table) => relation_table.father_id,
    { nullable: true },
  )
  relation_table_father?: RelationsTable;
}
