import { SORT_METHOD } from "../../constants";

export const sortOrders = (orders, sortMethod) => {
  orders.sort((a, b) => {
    const dateA = new Date(a.deliverDate);
    const dateB = new Date(b.deliverDate);
    if (sortMethod === SORT_METHOD.ASCENDING) {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
  return orders;
};
