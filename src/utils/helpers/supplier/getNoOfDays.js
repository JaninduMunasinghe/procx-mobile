import { NO_OF_DAYS } from "../../constants";

// returns a string in the format "in 2 days" or "due by 2 days"
export const getNoOfDays = (deliveryDate) => {
  const today = new Date();
  const delivery = new Date(deliveryDate);
  const diffTime = delivery - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1); // -1 to account for 12:00AM issue
  if (diffDays < 0) {
    return `due by ${Math.abs(diffDays)} days`;
  } else if (diffDays === 1) {
    return NO_OF_DAYS.TOMORROW;
  } else if (diffDays === 0) {
    return NO_OF_DAYS.TODAY;
  } else {
    return `in ${diffDays} days`;
  }
};
