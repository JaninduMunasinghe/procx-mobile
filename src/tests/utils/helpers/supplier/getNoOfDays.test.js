import { getNoOfDays } from "../../../../utils/helpers/supplier/getNoOfDays";

describe("getNoOfDays", () => {
  it("should return 'in 2 days' when delivery date is 2 days from now", () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    const result = getNoOfDays(deliveryDate);
    expect(result).toBe("in 2 days");
  });

  it("should return 'due by 2 days' when delivery date is 2 days ago", () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() - 2);
    const result = getNoOfDays(deliveryDate);
    expect(result).toBe("due by 2 days");
  });

  it("should return 'due yesterday' when delivery date is yesterday", () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() - 1);
    const result = getNoOfDays(deliveryDate);
    expect(result).toBe("due yesterday");
  });
});
