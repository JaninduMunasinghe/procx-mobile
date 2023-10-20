import { URGENT_STATUS } from "../../constants";

export const getDeliveryUrgency = (deliveryDate) => {
  try {
    const today = new Date();
    const delivery = new Date(deliveryDate);

    if (isNaN(delivery.getTime())) {
      throw new Error("Invalid date format for deliveryDate.");
    }

    const diffTime = Math.abs(delivery - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (delivery < today) {
      return URGENT_STATUS.PAST;
    } else if (diffDays <= 2) {
      return URGENT_STATUS.URGENT;
    } else if (diffDays <= 5) {
      return URGENT_STATUS.MEDIUM;
    } else {
      return URGENT_STATUS.LOW;
    }
  } catch (error) {
    console.error("Error in getDeliveryUrgency:", error);
    return URGENT_STATUS.LOW; // Default to low urgency on error
  }
};
