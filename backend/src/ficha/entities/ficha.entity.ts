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
  id: string;

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
    type: 'text',
  })
  etapa: string;

  @Column({
    length: 1,
    type: 'varchar',
  })
  turno: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  escolar_period: string;

  @Column({
    type: 'text',
  })
  proce_plant: string;

  @CreateDateColumn()
  ins_date: Date;

  @Column({
    type: 'boolean',
  })
  egresado?: boolean;

  @ManyToOne(() => User, (user) => user.ficha_id, { eager: true })
  personal_res: User;

  @OneToOne(() => RelationsTable, (relationTable) => relationTable.ficha_id)
  relationTable?: RelationsTable;
}
