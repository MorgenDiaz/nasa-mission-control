const path = require("path");
const express = require("express");
const cors = require("cors");

const api = require("./route/api");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("combined"));
}
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/v1", api);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
