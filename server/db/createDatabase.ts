export const db = useDatabase();

db.exec(`
  CREATE TABLE IF NOT EXISTS carDealers (
    carType TEXT,
    dealerName TEXT, 
    dealerPhone TEXT, 
    dealerPostcode INT,
    dealerResidence TEXT, 
    websiteUrl TEXT
  )
`);
