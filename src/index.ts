import "dotenv/config";
import config from "config";
import express from "express";
import proxy from "express-http-proxy";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { MEDIA_ROOT } from "./utils";
import { default as authRoutes } from "./features/auth/route";
import { handleErrors } from "./middlewares";
import amqp from "amqplib";
const app = express();

// connect to database
mongoose
  .connect(config.get("db"))
  .then((result) => {
    console.log(`[+]${config.get("name")} Connected to database Successfully`);
  })
  .catch((err) => {
    console.log("[x]Could not connect to database" + err);
    process.exit(1); // Exit the application on database connection error
  });

// middlewares
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log(`[+]Morgan logger Enabled for ${config.get("name")}`);
}
app.use(cors());
app.use(express.json());
app.use(express.static(MEDIA_ROOT));

// routes
app.use("/auth", authRoutes);
app.use("/patients", proxy("http://localhost:5001"));
app.get("/", (req, res) => {
  res.send({ data: "Hello, world!" });
});

// error handler
app.use(handleErrors);

// -----------------------QUEUE TEST-----------------------------------
amqp.connect("amqp://localhost", function (error0: any, connection: any) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1: any, channel: any) {
    if (error1) {
      throw error1;
    }
    var queue = "hello";
    var msg = "Hello world";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
// --------------------------------------------------------------------
const port = config.get("port");
app.listen(port, () => {
  console.log(`[+]${config.get("name")} listening on port ${port}...`);
});
