import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('person')
export class Person {
  @PrimaryColumn()
  ciNumber: string;

  @Column()
  name: string;

  @Column({
    name: 'lastname',
  })
  lastName: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: true,
  })
  email?: string;

  @Column({
    type: 'text',
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
}
