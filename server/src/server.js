const http = require("http");
require("dotenv").config();
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanetsData } = require(`./model/planets.model`);
const { loadLaunchData } = require(`./model/launches.model`);

const server = http.createServer(app);
const { PORT = 3001 } = process.env;

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log("server is running on PORT: ", PORT);
  });
}

startServer();
