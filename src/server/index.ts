import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { MEDIA_ROOT, configuration } from "../utils";
import { default as authRoutes } from "../features/auth/routes";
import { authenticate, handleErrors } from "../middlewares";
import filesRoute from "../features/files/routes";
import { default as facilityRoutes } from "../features/facilities/routes";
import { default as patientsRouter } from "../features/patients/routes";
import { default as hivRouter } from "../features/hiv/routes";
import { default as mapsRouter } from "../features/maps/routes";
import { default as usersRouter } from "../features/users/routes";

export const dbConnection = async () => {
  try {
    await mongoose.connect(configuration.db as string);
    console.info(
      `[+]${configuration.name}:${configuration.version} Connected to database Successfully`
    );
  } catch (error) {
    console.error("[x]Could not connect to database" + error);
    process.exit(1); // Exit the application on database connection error
  }
};

export const configureExpressApp = async (app: Application) => {
  // --------------------middlewares---------------------------

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.info(
      `[+]${configuration.name}:${configuration.version} enable morgan`
    );
  }
  app.use(cors());
  app.use(express.json());
  app.use(express.static(MEDIA_ROOT));
  // ------------------End middlewares------------------------

  //------------------- routes --------------------------------
  app.use("/api/auth", authRoutes);
  app.use("/users", usersRouter);

  app.use("/files", filesRoute);
  app.use("/facilities", facilityRoutes);
  app.use("/patients", patientsRouter);
  app.use("/hiv-program", authenticate as any, hivRouter);
  app.use("/maps", mapsRouter);

  app.get("/", (req, res) => {
    res.send({ data: "Hello, world!" });
  });
  //-------------------end routes-----------------------------

  //---------------- error handler -----------------------
  app.use(handleErrors);
  //---------------- end error handler -----------------------
};
