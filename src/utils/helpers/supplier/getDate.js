// get date function. accepts iso date string. returns in the format Month Date, Year
export const getDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};
