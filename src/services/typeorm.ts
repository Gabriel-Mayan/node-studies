import "reflect-metadata";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { User } from "@entity/User";

config();

export const AppDataSource = new DataSource({
  type: process.env.DB_CLIENT as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
