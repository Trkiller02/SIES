export enum messagesEnum {
  not_found = 'Registro no encontrado.',
  conflict_err = 'Existe un conflicto con los datos suministrados',
  bad_req_err = 'Error en la solicitud.',
  unauth_err = 'No se encuentra autorizado para realizar la solicitud.',
  not_empty = 'no puede estar vacio.',
  not_min = 'no cumple con el minimo de caracteres. ($constraint1)',
  not_format = 'no cumple con el formato esperado.',
}

export const validationMsg = (
  propiedad: string,
  message: messagesEnum,
): string => {
  return `${propiedad} ${message}`;
};
