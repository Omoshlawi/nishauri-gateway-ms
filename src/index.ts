import "dotenv/config";
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
    const address = httpServer.address();
    const bind =
      typeof address === "string" ? `pipe ${address}` : `port ${address?.port}`;
    console.info(
      `[+]${configuration.name}:${configuration.version} listening on ${bind}`
    );
  });
};

startServer();
