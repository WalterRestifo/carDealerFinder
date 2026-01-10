import type { User } from "../types";
import { db } from "../db/createDatabase";

export default defineEventHandler(async (event) => {
  const searchParam = getQuery<User>(event);

  const { rows } =
    await db.sql`SELECT DISTINCT * FROM carDealers WHERE dealerPostcode=${searchParam.search}`;

  return rows;
});
