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
app.get("/", (req, res) => {
  res.send({ data: "Hello, world!" });
});

// error handler
app.use(handleErrors);

const port = config.get("port");
app.listen(port, () => {
  console.log(`[+]${config.get("name")} listening on port ${port}...`);
});
