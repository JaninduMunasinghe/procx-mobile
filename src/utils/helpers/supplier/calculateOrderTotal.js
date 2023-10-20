export const calculateOrderTotal = (items) => {
  let total = 0;
  items.map((item) => {
    total += item.price * item.qty;
  });
  return total;
};
