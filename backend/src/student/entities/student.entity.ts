import { Person } from 'src/person/entities/person.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('student')
export class Student {
  @OneToOne(() => Person, (person) => person.ciNumber)
  @JoinColumn()
  person_id: string;

  @Column()
  age?: number;

  @Column()
  sex?: string;

  @Column({
    nullable: true,
  })
  weight?: number;

  @Column({
    nullable: true,
  })
  size?: number;

  @Column({
    nullable: true,
  })
  Lateralidad?: string;

  @Column()
  bornPlace: string;

  @Column()
  bornState: string;

  @Column()
  bornMunicipio: string;

  @Column()
  bornParroquia: string;

  @Column()
  bornPais: string;

  @Column()
  bornDate: string;
}
