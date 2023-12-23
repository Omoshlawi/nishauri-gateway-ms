// src/index.ts
import express from "express";
import "dotenv/config";
const app = express();
import config from "config";

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const port = config.get("port");
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
