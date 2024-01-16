import { Column, Entity } from 'typeorm';

@Entity('health_info')
export class HealtInfo {
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
}
