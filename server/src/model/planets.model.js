const fileSystem = require("fs");
const path = require(`path`);
const { parse } = require("csv-parse");
const planets = require("./planets.mongo");

const PLANETS_FILE = path.join(
  __dirname,
  "..",
  "..",
  "data",
  "kepler_data.csv"
);

const habitablePlanets = [];

const LIGHT_EXP_MIN = 0.36;
const LIGHT_EXP_MAX = 1.11;
const EARTH_RADIUS_FACTOR = 1.6;

const isHabitable = (planet) => {
  const { koi_disposition, koi_insol, koi_prad } = planet;
  return (
    koi_disposition === "CONFIRMED" &&
    koi_insol > LIGHT_EXP_MIN &&
    koi_insol < LIGHT_EXP_MAX &&
    koi_prad < EARTH_RADIUS_FACTOR
  );
};

async function getAllplanets() {
  return planets.find({}, { _id: 0, __v: 0 });
}

async function savePlanet(planet) {
  const { keplerName } = planet;

  try {
    await planets.updateOne({ keplerName }, { keplerName }, { upsert: true });
  } catch (error) {
    console.error(`Could not save planet ${error}`);
  }
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fileSystem
      .createReadStream(PLANETS_FILE)
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (planet) => {
        if (isHabitable(planet)) {
          const keplerName = planet.kepler_name;
          savePlanet({ keplerName });
        }
      })
      .on("error", (error) => {
        console.error(error);
        reject(error);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllplanets()).length;
        console.log(`${countPlanetsFound} habitable planets found.`);
        resolve();
      });
  });
}

module.exports = {
  loadPlanetsData,
  getAllplanets,
};
