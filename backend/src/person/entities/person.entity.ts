import { Represent } from 'src/represent/entities/represent.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('person')
export class Person {
  @PrimaryColumn()
  ci_number: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

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
  })
  phone_number?: string;

  @Column({
    type: 'text',
  })
  home_dir: string;

  @Column({
    type: 'text',
  })
  home_parroquia: string;

  @Column({
    type: 'text',
  })
  home_municipio: string;

  @Column()
  relation: string;

  @OneToOne(() => Student, (student) => student.person_id)
  relationStudent?: Student;

  @OneToOne(() => Represent, (represent) => represent.person_id)
  relationRepresent?: Represent;
}
