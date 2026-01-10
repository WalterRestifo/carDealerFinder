import type { KiaData } from "../types";
import { serializeKiaDealerData } from "../utils";
import { db } from "../db/createDatabase";

export default defineNitroPlugin(async () => {
  console.log("server initialised. Begin data retrieval");

  try {
    const data: KiaData = await $fetch("https://www.kia.com/api/bin/dealer", {
      query: {
        locale: "de-de",
        program: "dealerLocatorSearch",
      },
    });

    const serializedKiaData = serializeKiaDealerData(data.list);

    const insert = db.prepare(
      `INSERT OR REPLACE INTO carDealers (id, dealerName, dealerPhone, dealerPostcode, dealerResidence, websiteUrl ) VALUES (?, ?, ?, ?, ?, ?)`
    );
    for (const dealer of serializedKiaData) {
      insert.run(
        dealer.id,
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
