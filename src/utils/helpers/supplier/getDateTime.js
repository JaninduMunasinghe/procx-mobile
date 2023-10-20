// get date time string in the format 2023-10-20T00:00:00.000Z and return date time as "10th October 2023, 12:00 AM"
export const getDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};
