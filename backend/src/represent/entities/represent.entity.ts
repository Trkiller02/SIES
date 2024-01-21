import { Column, JoinColumn, OneToOne } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';

export class Represent {
  @OneToOne(() => Person, (person) => person.ciNumber, { eager: true })
  @JoinColumn()
  person_id: string;

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
}
