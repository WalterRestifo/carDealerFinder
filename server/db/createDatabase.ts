export const db = useDatabase();

db.exec(`
  CREATE TABLE IF NOT EXISTS carDealers (
    id INT PRIMARY KEY,
    dealerName TEXT, 
    dealerPhone TEXT, 
    dealerPostcode INT,
    dealerResidence TEXT, 
    websiteUrl TEXT
  )
`);
