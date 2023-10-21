export const getDate = (date) => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  const options = { year: "numeric", month: "long", day: "numeric" };
  return parsedDate.toLocaleDateString(undefined, options);
};
