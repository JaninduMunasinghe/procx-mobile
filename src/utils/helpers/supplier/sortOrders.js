import { SORT_METHOD } from "../../constants";

export const sortOrders = (orders, sortMethod) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  orders.sort((a, b) => {
    const dateA = new Date(a.deliverDate);
    const dateB = new Date(b.deliverDate);

    if (sortMethod === SORT_METHOD.DESCENDING) {
      if (dateA < today && dateB < today) {
        return dateA - dateB;
      } else if (dateA < today) {
        return -1;
      } else if (dateB < today) {
        return 1;
      } else {
        return dateA - dateB;
      }
    } else {
      if (dateA > today && dateB > today) {
        return dateB - dateA;
      } else if (dateA > today) {
        return -1;
      } else if (dateB > today) {
        return 1;
      } else {
        return dateB - dateA;
      }
    }
  });

  return orders;
};
