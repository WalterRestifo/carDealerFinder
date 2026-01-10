export type KiaCarDealer = {
  rn: number;
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

export type CarDealer = {
  id: number;
  dealerName: string;
  dealerPhone: string;
  dealerPostcode: number;
  dealerResidence: string;
  websiteUrl: string;
};

export type User = {
  search: string;
};
