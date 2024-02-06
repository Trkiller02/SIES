import { RelationsTable } from 'src/relations-table/entities/relations-table.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('health_info')
export class HealtInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  type_aler?: string;

  @Column()
  live_with: string;

  @Column({
    type: 'text',
  })
  trata_esp: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  prefer_act: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  recre_time: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  site_act: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  sex: string;

  @Column({
    type: Number,
    nullable: true,
  })
  weight?: number;

  @Column({
    type: Number,
    nullable: true,
  })
  size?: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  lateralidad?: string;

  @OneToOne(() => RelationsTable, (relationTable) => relationTable.id)
  relationTable: RelationsTable;
}
