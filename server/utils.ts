import type { CarDealer, KiaCarDealer } from "./types";

export const serializeKiaDealerData = (
  carDealers: KiaCarDealer[]
): CarDealer[] => {
  // take only the relevants keys from the huge kia data object
  const result = carDealers.map((carDealer) => {
    return {
      id: carDealer.rn,
      dealerName: carDealer.dealerName,
      dealerPhone: carDealer.dealerPhone,
      dealerPostcode: carDealer.dealerPostcode,
      dealerResidence: carDealer.dealerResidence,
      websiteUrl: carDealer.websiteUrl || "",
    };
  });

  return result;
};
