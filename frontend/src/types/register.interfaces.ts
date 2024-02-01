export interface PersonI {
  name: string;
  lastName: string;
  ciNumber: string;
  email: string | null;
  phoneNumber: string | null;
  homeDir: string;
  homeParroquia: string;
  homeMunicipio: string;
  relation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RepresentI {
  representCiNumber: string;
  profession: string;
  tlfnHome: string | null;
  workPlace: string;
  workPhoneNumber: string;
  incomeMonth: string;
  personRelation: PersonI;
}

export interface FichaI {
  id: string;
  level: string;
  section: string;
  etapa: string;
  turno: string;
  procePlant: string;
  escolarPeriod: string;
  InsDate: Date;
  personalRes: string;
}

export interface StatusI {
  idStatus: string;
  typeAler: string;
  trataEsp: string;
  preferAct: string;
  recreTime: string;
  siteAct: string;
  proLevel: string;
  plantProce: string;
}

export interface StudentI {
  studentCiNumber: string;
  bornState: string;
  bornPais: string;
  bornDate: string;
  liveWith: string;
  age: number;
  sex: string;
  weight: number;
  size: number;
  Lateralidad: string;
  instPro: string;
  studentRelation: PersonI;
}
