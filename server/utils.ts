import {
  CarDealer,
  KiaCarDealer,
  SeatCarDealer,
  carTypes,
  OpelCarDealer,
} from "./types";

export const noUrl = "Keine webseite";

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
      dealerResidence: carDealer.dealerResidence.toLowerCase(),
      websiteUrl: carDealer.websiteUrl || noUrl,
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
      dealerResidence: carDealer.ORT.toLocaleLowerCase(),
      websiteUrl: carDealer.URL || noUrl,
    };
  });

  return result;
};

export const serializeOpelData = (carDealers: OpelCarDealer[]): CarDealer[] => {
  const result = carDealers.map((carDealer) => {
    return {
      carType: carTypes.OPEL,
      dealerName: carDealer.dealerName,
      dealerPhone: carDealer.generalContact.phone1,
      dealerPostcode: carDealer.address.postalCode,
      dealerResidence: carDealer.address.cityName.toLowerCase(),
      websiteUrl: carDealer.dealerUrl || noUrl,
    };
  });

  return result;
};
