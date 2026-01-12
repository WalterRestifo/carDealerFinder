import {
  carTypes,
  type CarDealer,
  type OpelCarDealer,
  type SeatCarDealer,
} from "~~/server/types";

export const mockDealer: CarDealer = {
  carType: carTypes.KIA,
  dealerName: "Autohaus John Doe",
  dealerPhone: "0123 456789",
  dealerPostcode: 63775,
  dealerResidence: "Musterstadt",
  websiteUrl: "www.test@test.de",
};

export const mockSeatCarDealer: SeatCarDealer = {
  NAME1: "Autohaus Max Mustermann",
  TELEFON: "0123 4567",
  PLZ: 1234,
  ORT: "Musterstadt",
  URL: "www.testSeat@test.de",
};

export const mockOpelCarDealer: OpelCarDealer = {
  dealerName: "Autohaus blub",
  generalContact: { phone1: "0123 4565" },
  address: { postalCode: 12345, cityName: "Musterstadt" },
  dealerUrl: "www.musterurl@test.de",
};
