import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  restoreToken: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  ciNumber: string;

  @Column({ unique: true })
  email: string;

  // role         Rol          @relation(fields: [roleId], references: [idRol])
  roleId: number;

  @Column({ select: false })
  password: string;

  @CreateDateColumn({
    insert: false,
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    insert: false,
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
