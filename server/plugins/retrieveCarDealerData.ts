import type { KiaData, OpelData, SeatData } from "../types";
import {
  serializeKiaDealerData,
  serializeOpelData,
  serializeSeatData,
} from "../utils";
import { db } from "../db/createDatabase";

export default defineNitroPlugin(async () => {
  try {
    const kiaData: KiaData = await $fetch(
      "https://www.kia.com/api/bin/dealer",
      {
        query: {
          locale: "de-de",
          program: "dealerLocatorSearch",
        },
      }
    );

    const seatData: SeatData = await $fetch(
      "https://haendlersuche.seat.de///tmp/b93b5efda7f2cc5a13f0ae5bbb3c9981.cache"
    );

    const opelData: OpelData = await $fetch(
      "https://infra.prod.sformproduct.stla-aws.net/forms-product-dealers-api/v1/dealers",
      {
        query: {
          searchTerm: "Deutschland",
          searchType: "city",
          distance: "50",
          distanceUnit: "km",
          maxResults: "9999",
          brand: "OPEL",
          consumer: "FormsProduct",
          activities: "VN",
          countryCode: "DE",
          languageCode: "de",
        },
      }
    );

    const serializedKiaData = serializeKiaDealerData(kiaData.list);
    const serializedSeatData = serializeSeatData(seatData.allDealers.v);
    const serializedOpelData = serializeOpelData(opelData);

    const serializedData = [
      ...serializedKiaData,
      ...serializedSeatData,
      ...serializedOpelData,
    ];

    const insert = db.prepare(
      `INSERT OR REPLACE INTO carDealers (carType, dealerName, dealerPhone, dealerPostcode, dealerResidence, websiteUrl ) VALUES (?, ?, ?, ?, ?, ?)`
    );
    for (const dealer of serializedData) {
      insert.run(
        dealer.carType,
        dealer.dealerName,
        dealer.dealerPhone,
        dealer.dealerPostcode,
        dealer.dealerResidence,
        dealer.websiteUrl
      );
    }
  } catch (error) {
    console.log("error while retrieving the data: ", error);
  }
});
