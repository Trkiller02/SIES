import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { RelationsTable } from 'src/relations-table/entities/relations-table.entity';

@Entity('represent')
export class Represent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Person, (person) => person.ciNumber, { eager: true })
  @JoinColumn({ name: 'person_id' })
  person_id: Person;

  @Column({
    type: 'text',
    nullable: true,
  })
  profession?: string;

  @Column({
    name: 'tlfn_home',
    type: 'varchar',
    length: 14,
    nullable: true,
  })
  tlfnHome?: string;

  @Column({
    name: 'work_place',
    type: 'text',
    nullable: true,
  })
  workPlace?: string;

  @Column({
    name: 'work_phone_number',
    type: 'varchar',
    length: 14,
    nullable: true,
  })
  workPhoneNumber?: string;

  @Column({
    type: 'int',
    name: 'income_month',
    nullable: true,
  })
  incomeMonth?: number;

  @ManyToMany(() => RelationsTable)
  relation_table_id?: RelationsTable;
}
