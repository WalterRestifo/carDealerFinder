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

export type OpelCarDealer = {
  dealerName: string;
  generalContact: {
    phone1: string;
  };
  address: {
    postalCode: number;
    cityName: string;
  };
  dealerUrl: string;
};

export type OpelData = OpelCarDealer[];

export enum carTypes {
  KIA = "Kia",
  SEAT = "Seat",
  OPEL = "Opel",
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
