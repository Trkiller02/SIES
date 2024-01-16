import { Person } from 'src/person/entities/person.entity';
import { Column, Entity } from 'typeorm';

@Entity('student')
export class Student extends Person {
  @Column()
  age;

  @Column()
  sex: string;

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
