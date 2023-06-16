/* eslint-disable no-console */
import "reflect-metadata";
import app from "app";
import AppDataSource from "@services/typeorm";
import initializeSentry from "@services/sentry";

const port = process.env.PORT as string || 8080;
initializeSentry(process.env.SENTRY_URL as string);

AppDataSource.initialize().then(async () => {
  console.log("Connection initialized with database...");
  app.listen(port, () => console.log(`Running on http://localhost:${port}`));
}).catch((error) => console.log(error));
