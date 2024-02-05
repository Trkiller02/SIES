import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'restore_token' })
  restore_token: string;

  @Column()
  name: string;

  @Column({ name: 'lastname' })
  lastname: string;

  @Column({ unique: true })
  ci_number: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Role, (role) => role.id, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role_id: number | Role;

  @Column({ select: false })
  password: string;

  @CreateDateColumn({
    insert: false,
    update: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    insert: false,
  })
  updated_at: Date;

  @DeleteDateColumn({
    insert: false,
  })
  deleted_at: Date;
}
