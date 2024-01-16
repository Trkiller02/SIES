import { RelationsTable } from 'src/relations-table/entities/relations-table.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('academic_info')
export class Ficha {
  @PrimaryGeneratedColumn('uuid')
  idFicha: string;

  @Column({
    type: 'int',
  })
  level: number;

  @Column({
    length: 1,
    type: 'varchar',
  })
  section: string;

  @Column({
    length: 1,
    type: 'varchar',
  })
  etapa: string;

  @Column({
    length: 1,
    type: 'varchar',
  })
  turno: string;

  @Column({
    type: 'text',
  })
  procePlant: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  escolarPeriod: string;

  @CreateDateColumn()
  insDate: Date;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  personalRes: User;

  @OneToOne((type) => RelationsTable, { eager: true })
  relationTable: RelationsTable;
}
