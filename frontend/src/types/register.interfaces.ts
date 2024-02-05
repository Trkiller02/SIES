export interface PersonI {
  ci_number: string;
  name: string;
  lastname: string;
  email?: string;
  phone_number?: string;
  home_dir: string;
  home_parroquia: string;
  home_municipio: string;
  relation: string;
}

export interface RepresentI {
  id: string;
  person_id: PersonI;
  profession?: string;
  tlfn_home?: string;
  work_place?: string;
  work_phone_number?: string;
  income_month?: number;
}

export interface FichaI {
  id: string;
  level: number;
  section: string;
  etapa: string;
  turno: string;
  proce_plant: string;
  escolar_period: string;
  ins_date: Date;
  personal_res: string;
}

export interface HealthInfoI {
  id: string;
  live_with: string;
  type_aler: string;
  trata_esp: string;
  prefer_act: string;
  recre_time: string;
  site_act: string;
}

export interface StudentI {
  id: string;
  person_id: PersonI;
  age?: number;
  sex?: string;
  weight?: number;
  size?: number;
  lateralidad?: string;
  born_place: string;
  born_state: string;
  born_municipio: string;
  born_parroquia: string;
  born_pais: string;
  born_date: string;
}

export interface RelationTableI {
  id: string;
  represent_id: RepresentI;
  ficha_id: FichaI;
  mother_id?: RepresentI;
  father_id?: RepresentI;
  healt_info_id: HealthInfoI;
  student_id: StudentI;
}

export interface RoleI {
  id: number;
  name: string;
}

export interface UserI {
  id: string;
  restore_token: string;
  name: string;
  lastname: string;
  ci_number: string;
  email: string;
  role_id: number | RoleI;
  password: string;
}
