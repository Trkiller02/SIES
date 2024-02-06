import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { RelationsTable } from 'src/relations-table/entities/relations-table.entity';

@Entity('represent')
export class Represent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Person, (person) => person.relationRepresent, { eager: true })
  @JoinColumn({ name: 'person_id' })
  person_id: Person;

  @Column({
    type: 'text',
    nullable: true,
  })
  profession?: string;

  @Column({
    type: 'varchar',
    length: 14,
    nullable: true,
  })
  tlfn_home?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  work_place?: string;

  @Column({
    type: 'varchar',
    length: 14,
    nullable: true,
  })
  work_phone_number?: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  income_month?: number;

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
