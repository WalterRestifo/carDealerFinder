export type KiaCarDealer = {
  dealerName: string;
  dealerPhone: string;
  dealerPostcode: number;
  dealerResidence: string;
  websiteUrl: string;
};

export type KiaData = {
  total: number;
  list: KiaCarDealer[];
};

export type SeatCarDealer = {
  NAME1: string;
  TELEFON: string;
  PLZ: number;
  ORT: string;
  URL: string;
};

export type SeatData = {
  allDealers: {
    v: SeatCarDealer[];
  };
};

export enum carTypes {
  KIA = "Kia",
  SEAT = "Seat",
}

export type CarDealer = {
  carType: carTypes;
  dealerName: string;
  dealerPhone: string;
  dealerPostcode: number;
  dealerResidence: string;
  websiteUrl: string;
};

export type User = {
  search: string;
};
