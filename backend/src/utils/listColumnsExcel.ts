import { Style } from 'exceljs';

export const headerStyle: Partial<Style> = {
  font: {
    name: 'Arial',
    size: 10,
    bold: true,
    color: {
      argb: 'FFFFFF',
    },
  },
  alignment: {
    vertical: 'middle',
    horizontal: 'center',
  },
  border: {
    top: { style: 'thin', color: { argb: '000' } },
    right: { style: 'thin', color: { argb: '000' } },
    bottom: { style: 'thin', color: { argb: '000' } },
    left: { style: 'thin', color: { argb: '000' } },
  },
  fill: {
    type: 'pattern',
    pattern: 'solid',
    bgColor: {
      argb: '6bf556',
    },
  },
  protection: {
    locked: true,
  },
};

const rowStyle: Partial<Style> = {
  font: {
    name: 'Arial',
    size: 10,
  },
  alignment: {
    vertical: 'top',
    horizontal: 'left',
  },
};

export const representColumns = [
  { header: 'RELACIÓN', key: 'relation', width: 25, style: rowStyle },
  {
    header: 'REPRESENTANTE LEGAL',
    key: 'represent',
    width: 25,
    style: rowStyle,
  },
  { header: 'NOMBRE', key: 'name', width: 25, style: rowStyle },
  { header: 'APELLIDO', key: 'lastname', width: 25, style: rowStyle },
  { header: 'CORREO ELECTRÓNICO', key: 'email', width: 25, style: rowStyle },
  { header: 'C.I.', key: 'ci_number', width: 15, style: rowStyle },
  { header: 'NO. TELEFÓNICO', key: 'phone_number', width: 25, style: rowStyle },
  { header: 'DIRECCIÓN DE HOGAR', key: 'home_dir', width: 50, style: rowStyle },
  {
    header: 'DIRECCIÓN DE HOGAR (Parroquia)',
    key: 'home_parroquia',
    width: 30,
    style: rowStyle,
  },
  {
    header: 'DIRECCIÓN DE HOGAR (Municipio)',
    key: 'home_municipio',
    width: 30,
    style: rowStyle,
  },
  {
    header: 'NO. TELEFÓNICO DEL HOGAR',
    key: 'tlfn_home',
    width: 25,
    style: rowStyle,
  },
  { header: 'PROFESIÓN', key: 'profession', width: 25, style: rowStyle },
  { header: 'LUGAR DE TRABAJO', key: 'work_place', width: 50, style: rowStyle },
  {
    header: 'NO. TELEFÓNICO DE TRABAJO',
    key: 'work_phone_number',
    width: 25,
    style: rowStyle,
  },
  {
    header: 'INGRESOS MENSUALES',
    key: 'income_month',
    width: 20,
    style: rowStyle,
  },
];

export const userColumns = [
  { header: 'ROL', key: 'role_id', width: 25, style: rowStyle },
  { header: 'NOMBRE', key: 'name', width: 25, style: rowStyle },
  { header: 'APELLIDO', key: 'lastname', width: 25, style: rowStyle },
  { header: 'CORREO ELECTRÓNICO', key: 'email', width: 25, style: rowStyle },
  { header: 'C.I.', key: 'ci_number', width: 15, style: rowStyle },
];

export const healthColumns = [
  { header: 'SEXO', key: 'sex', width: 15, style: rowStyle },
  { header: 'PESO', key: 'weight', width: 15, style: rowStyle },
  { header: 'ESTATURA', key: 'size', width: 15, style: rowStyle },
  { header: 'LATERALIDAD', key: 'lateralidad', width: 20, style: rowStyle },
  { header: 'VIVE CON', key: 'live_with', width: 25 },
  { header: 'TIPOS DE ALERGIAS', key: 'type_aler', width: 25, style: rowStyle },
  {
    header: 'TRATAMIENTO ESPECIAL',
    key: 'trata_esp',
    width: 25,
    style: rowStyle,
  },
  {
    header: 'ACTIVIDAD PREFERIDA',
    key: 'prefer_act',
    width: 25,
    style: rowStyle,
  },
  {
    header: 'TIEMPO DE RECREACION',
    key: 'recre_time',
    width: 25,
    style: rowStyle,
  },
  {
    header: 'DONDE PRACTICA LA ACTIVIDAD',
    key: 'site_act',
    width: 50,
    style: rowStyle,
  },
];

export const studentColumns = [
  { header: 'ETAPA', key: 'etapa', width: 20, style: rowStyle },
  { header: 'NIVEL', key: 'level', width: 10, style: rowStyle },
  { header: 'SECCIÓN', key: 'section', width: 10, style: rowStyle },
  { header: 'TURNO', key: 'turno', width: 10, style: rowStyle },
  {
    header: 'PERIODO ESCOLAR',
    key: 'escolar_period',
    width: 20,
    style: rowStyle,
  },
  { header: 'EGRESADO', key: 'egresado', width: 15, style: rowStyle },
  { header: 'NOMBRE', key: 'name', width: 25, style: rowStyle },
  { header: 'APELLIDO', key: 'lastname', width: 25, style: rowStyle },
  { header: 'CORREO ELECTRÓNICO', key: 'email', width: 25, style: rowStyle },
  { header: 'C.I.', key: 'ci_number', width: 15, style: rowStyle },
  { header: 'NO. TELEFÓNICO', key: 'phone_number', width: 25, style: rowStyle },
  { header: 'DIRECCIÓN DE HOGAR', key: 'home_dir', width: 50, style: rowStyle },
  {
    header: 'DIRECCIÓN DE HOGAR (Parroquia)',
    key: 'home_parroquia',
    width: 30,
    style: rowStyle,
  },
  {
    header: 'DIRECCIÓN DE HOGAR (Municipio)',
    key: 'home_municipio',
    width: 30,
    style: rowStyle,
  },
  {
    header: 'FECHA DE NACIMIENTO',
    key: 'born_date',
    width: 25,
    style: rowStyle,
  },
  {
    header: 'LUGAR DE NACIMIENTO',
    key: 'born_place',
    width: 50,
    style: rowStyle,
  },
  {
    header: 'ESTADO DE NACIMIENTO',
    key: 'born_state',
    width: 25,
    style: rowStyle,
  },
  {
    header: 'MUNICIPIO DE NACIMIENTO',
    key: 'born_municipio',
    width: 25,
    style: rowStyle,
  },
  {
    header: 'PARROQUIA DE NACIMIENTO',
    key: 'born_parroquia',
    width: 25,
    style: rowStyle,
  },
  {
    header: 'PAÍS DE NACIMIENTO',
    key: 'born_pais',
    width: 25,
    style: rowStyle,
  },
];
