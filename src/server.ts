import 'reflect-metadata';
import { app } from "./app";
import { AppDataSource } from "./services/typeorm";

const port = process.env.PORT as string || 8080;

AppDataSource.initialize().then(async () => {
  console.log("Connection initialized with database...");
  app.listen(port, () => console.log(`Running on http://localhost:${port}`));
})
.catch((error) => console.log(error));
