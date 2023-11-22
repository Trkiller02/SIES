export const dateHandler = (a: string) => {
  const age = Math.floor(
    (new Date().getTime() - new Date(a).getTime()) / 31557600000
  );

  return age;
};
