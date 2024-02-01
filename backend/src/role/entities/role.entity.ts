import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.id)
  user_id: User;
}
