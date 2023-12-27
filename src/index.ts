import "dotenv/config";
import config from "config";
import express from "express";
import { createServer } from "http";
import { configureExpressApp, dbConnection } from "./server";
import { messageBroker } from "./amqp";
import { configuration } from "./utils";

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);
  //-------------- connect to database---------------------
  await dbConnection();
  //-------------- end database connecivity      ---------------------
  // -----------------Message broker--------------------------
  const channel = await messageBroker.createChannel();
  // -----------------End Message broker---------------------
  await configureExpressApp(app, channel);
  const port = configuration.port ?? 0;
  httpServer.listen(port, () => {
    console.info(
      `[+]${configuration.name}:${configuration.version} listening on port ${
        (httpServer.address() as any).port
      }...`
    );
  });
};

startServer();
