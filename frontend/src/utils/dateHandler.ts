export const dateHandler = (a: string) => {
  const age = Math.floor((new Date() - new Date(a)) / 31557600000);

  return age;
};
