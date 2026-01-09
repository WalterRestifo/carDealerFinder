type User = {
  search: string;
};

export default defineEventHandler(async (event) => {
  const searchParam = getQuery<User>(event);
  console.log("searchParam: ", searchParam);

  const db = useDatabase();

  const { rows } =
    await db.sql`SELECT DISTINCT * FROM carDealers WHERE plz=${searchParam.search}`;

  return rows;
});
