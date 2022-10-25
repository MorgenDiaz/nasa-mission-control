const planetsModel = require("../../model/planets.model");

async function getAllPlanets(req, res) {
  return res.status(200).json(await planetsModel.getAllplanets());
}

module.exports = {
  getAllPlanets,
};
