import { NO_OF_DAYS } from "../../constants";

export const getNoOfDays = (deliveryDate) => {
  const today = new Date();
  const delivery = new Date(deliveryDate);
  const diffTime = delivery - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 2) {
    return "in 2 days";
  } else if (diffDays === -2) {
    return "due by 2 days";
  } else if (diffDays === 1) {
    return NO_OF_DAYS.TOMORROW;
  } else if (diffDays === 0) {
    return NO_OF_DAYS.TODAY;
  } else if (diffDays === -1) {
    return "due yesterday";
  } else if (diffDays < 0) {
    return `due by ${Math.abs(diffDays)} days`;
  } else {
    return `in ${diffDays} days`;
  }
};
