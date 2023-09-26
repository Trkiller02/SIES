export enum Roles {
  ADMIN = 'ADMIN',
  PROFESOR = 'PROFESOR',
  SECRETARIA = 'SECRETARIA',
}

export class User {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: Roles;
  credentials: JSON;
  permisos: JSON;
}
