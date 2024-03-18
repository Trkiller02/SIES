const nonUpperCase = new Set([
  "email",
  "password",
  "role_id",
  "restore_token",
  "repeatPassword",
  "level",
  "egresado",
  "weight",
  "size",
  "phone_number",
  "tlfn_home",
  "work_phone_number",
  "income_month",
  "represent",
  "born_date",
  "age",
]);

export const mayusHandler = async (array: any) => {
  for (const key in array) {
    if (nonUpperCase.has(key)) {
      continue;
    }
    if (key === "person_id") {
      const { person_id } = array;
      for (const i in person_id) {
        if (nonUpperCase.has(i)) {
          continue;
        }

        array["person_id"][i] = (array["person_id"][i] as string)
          .toUpperCase()
          .trim();
      }
    }

    if (typeof array[key] === "string") {
      array[key] = (array[key] as string).toUpperCase().trim();
    } else {
      continue;
    }
  }
  return array;
};
