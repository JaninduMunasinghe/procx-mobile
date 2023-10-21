import { getDate } from "../../../../utils/helpers/supplier/getDate";

describe("getDate", () => {
  it("should return formatted date string", () => {
    const date = "2022-01-01T00:00:00.000Z";
    const formattedDate = getDate(date);
    expect(formattedDate).toBe("January 1, 2022");
  });

  it("should handle invalid date string", () => {
    const date = "invalid date";
    const formattedDate = getDate(date);
    expect(formattedDate).toBe("");
  });

  it("should handle empty date string", () => {
    const date = "";
    const formattedDate = getDate(date);
    expect(formattedDate).toBe("");
  });

  it("should handle null date string", () => {
    const date = null;
    const formattedDate = getDate(date);
    expect(formattedDate).toBe("");
  });

  it("should handle undefined date string", () => {
    const date = undefined;
    const formattedDate = getDate(date);
    expect(formattedDate).toBe("");
  });
});
