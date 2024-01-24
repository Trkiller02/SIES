import { Represent } from 'src/represent/entities/represent.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('person')
export class Person {
  @PrimaryColumn({
    name: 'ci_number',
  })
  ciNumber: string;

  @Column()
  name: string;

  @Column({
    name: 'lastname',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: true,
    unique: true,
  })
  email?: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: true,
    name: 'phone_number',
  })
  phoneNumber?: string;

  @Column({
    type: 'text',
    name: 'home_dir',
  })
  homeDir: string;

  @Column({
    type: 'text',
    name: 'home_parroquia',
  })
  homeParroquia: string;

  @Column({
    type: 'text',
    name: 'home_municipio',
  })
  homeMunicipio: string;

  @Column()
  relation: string;

  @OneToOne(() => Student, (student) => student.person_id)
  relationStudent?: Student;

  @OneToOne(() => Represent, (represent) => represent.person_id)
  relationRepresent?: Represent;
}
