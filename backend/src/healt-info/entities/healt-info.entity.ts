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
  typeAler?: string;

  @Column({
    type: 'text',
  })
  trataEsp: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  preferAct: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  recreTime: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  siteAct: string;

  @OneToOne(() => RelationsTable, (relationTable) => relationTable.id)
  relationTable: RelationsTable;
}
