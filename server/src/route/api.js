const express = require("express");

const app = express();
const planetsRouter = require(`./planets/planets.router`);
const launchesRouter = require("./launches/launches.router");

app.use(`/planets`, planetsRouter);
app.use(`/launches`, launchesRouter);

module.exports = app;
