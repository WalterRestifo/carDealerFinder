import type { KiaData, SeatData } from "../types";
import { serializeKiaDealerData, serializeSeatData } from "../utils";
import { db } from "../db/createDatabase";

export default defineNitroPlugin(async () => {
  console.log("server initialised. Begin data retrieval");

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

    const serializedKiaData = serializeKiaDealerData(kiaData.list);
    const serializedSeatData = serializeSeatData(seatData.allDealers.v);

    const serializedData = [...serializedKiaData, ...serializedSeatData];

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
    console.log("error while retrieving the data from kia: ", error);
  }
});
