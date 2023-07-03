import { Request } from "express";
import { IDatabaseUser } from "./user";

export interface RequestWithUserRole extends Request {
  user?: IDatabaseUser,
}
