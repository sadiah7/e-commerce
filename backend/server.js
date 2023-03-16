const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down Server");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const server = app.listen(4000, () => {
  console.log(`Server started on 4000`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down Server");

  server.close(() => {
    process.exit(1);
  });
});
