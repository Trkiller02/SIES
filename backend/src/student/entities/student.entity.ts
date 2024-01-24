import { Person } from 'src/person/entities/person.entity';
import { RelationsTable } from 'src/relations-table/entities/relations-table.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Person, (person) => person.ciNumber, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'person_id' })
  person_id: Person;

  @Column()
  age?: number;

  @Column()
  sex?: string;

  @Column({
    nullable: true,
  })
  weight?: number;

  @Column({
    nullable: true,
  })
  size?: number;

  @Column({
    nullable: true,
  })
  Lateralidad?: string;

  @Column()
  bornPlace: string;

  @Column()
  bornState: string;

  @Column()
  bornMunicipio: string;

  @Column()
  bornParroquia: string;

  @Column()
  bornPais: string;

  @Column()
  bornDate: string;

  @OneToOne(() => RelationsTable, (relationTable) => relationTable.student_id)
  relation_table_id?: RelationsTable;
}
