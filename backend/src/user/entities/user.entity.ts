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
  restoreToken: string;

  @Column()
  name: string;

  @Column({ name: 'lastname' })
  lastName: string;

  @Column({ unique: true, name: 'ci_number' })
  ciNumber: string;

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
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    insert: false,
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    insert: false,
    name: 'deleted_at',
  })
  deletedAt: Date;
}
