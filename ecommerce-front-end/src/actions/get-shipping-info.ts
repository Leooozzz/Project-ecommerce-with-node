"use server";

type ShippingInfoResponse = {
  zipcode: string;
  cost: number;
  days: number;
};

export const getShippingInfo = async (
  zipcode: string
): Promise<ShippingInfoResponse | false> => {
  return {
    zipcode: "1234",
    cost: 3,
    days: 9,
  };
};
