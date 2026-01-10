import { CarDealer, KiaCarDealer, SeatCarDealer, carTypes } from "./types";

export const serializeKiaDealerData = (
  carDealers: KiaCarDealer[]
): CarDealer[] => {
  // take only the relevants keys from the huge kia data object
  const result = carDealers.map((carDealer) => {
    return {
      carType: carTypes.KIA,
      dealerName: carDealer.dealerName,
      dealerPhone: carDealer.dealerPhone,
      dealerPostcode: carDealer.dealerPostcode,
      dealerResidence: carDealer.dealerResidence,
      websiteUrl: carDealer.websiteUrl || "",
    };
  });

  return result;
};

export const serializeSeatData = (carDealers: SeatCarDealer[]): CarDealer[] => {
  const result = carDealers.map((carDealer) => {
    return {
      carType: carTypes.SEAT,
      dealerName: carDealer.NAME1,
      dealerPhone: carDealer.TELEFON,
      dealerPostcode: carDealer.PLZ,
      dealerResidence: carDealer.ORT,
      websiteUrl: carDealer.URL || "",
    };
  });

  return result;
};
