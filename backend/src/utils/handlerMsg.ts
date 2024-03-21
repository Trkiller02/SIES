export enum msgEnum {
  credential_err = 'Credenciales incorrectas.',
  not_found = 'Registro no encontrado.',
  conflict_err = 'Existe un conflicto con los datos suministrados',
  bad_req_err = 'Error en la solicitud.',
  unauth_err = 'No se encuentra autorizado para realizar la solicitud.',
  not_empty = 'No puede estar vació.',
  not_min = 'No cumple con el mínimo de caracteres. ($constraint1)',
  not_format = 'no cumple con el formato esperado.',
  seeder = 'Error al sembrar la base de datos.',
  session_error = 'Ya existe una sesión activa para este usuario.',
}

export const validationMsg = (propiedad: string, message: msgEnum): string => {
  return `${propiedad} ${message}`;
};
