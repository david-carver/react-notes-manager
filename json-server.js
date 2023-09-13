const cron = require("node-cron");
const jsonServer = require("json-server");

const dbFile = "./db.json";
const defaultDbFile = "./db-default.json";

// Function to reset the db.json file to the db-default.json file
const resetDb = async () => {
  const data = await fs.readFileSync(defaultDbFile, "utf8");
  await fs.writeFileSync(dbFile, data);
};

// Schedule the db to be reset every hour
cron.schedule("0 * * * *", resetDb);

// Start the json-server
jsonServer.createServer(dbFile).listen(3200, () => {
  console.log("JSON Server started on port 3200");
});
