import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { configureExpressApp, dbConnection } from "./server";
import { configuration } from "./utils";
import { init, start, initConsoled } from "./shared/tracer";
import opentelemetry from "@opentelemetry/api";

// init();
// start();
const startServer = async () => {
  initConsoled();
  const app = express();
  const httpServer = createServer(app);
  //-------------- connect to database---------------------
  await dbConnection();
  //-------------- end database connecivity      ---------------------
  // -----------------Message broker--------------------------
  // -----------------End Message broker---------------------
  await configureExpressApp(app);
  const port = configuration.port ?? 0;
  httpServer.listen(port, () => {
    const address = httpServer.address();
    const bind =
      typeof address === "string" ? `pipe ${address}` : `port ${address?.port}`;
    console.info(
      `[+]${configuration.name}:${configuration.version} listening on ${bind}`
    );
  });
};

startServer();
