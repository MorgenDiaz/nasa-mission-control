const launches = require("../../model/launches.model");
const { getPagination } = require("../../services/query");

async function getAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  return res.status(200).json(await launches.getAllLaunches(skip, limit));
}

async function addNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: "Missing required launch property." });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid launch date." });
  }

  await launches.scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function abortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const existsLaunch = await launches.existsLaunch(launchId);

  if (!existsLaunch) {
    res.status(404).json({
      error: `Launch not found`,
    });
  }

  const aborted = await launches.abortLaunch(launchId);

  if (!aborted) {
    return res.status(400).json({ error: "Launch not aborted" });
  }
  return res.status(200).json({ ok: true });
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
