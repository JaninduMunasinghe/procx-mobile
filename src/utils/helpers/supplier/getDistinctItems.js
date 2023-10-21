// get distinct items from array of objects based on itemName, item objects should not be repeated, item.id should not be considered
export const getDistinctItems = (items, property) => {
  const distinctItems = [];
  const itemNames = [];
  items.forEach((item) => {
    if (!itemNames.includes(item[property])) {
      itemNames.push(item[property]);
      distinctItems.push(item);
    }
  });
  return distinctItems;
};
