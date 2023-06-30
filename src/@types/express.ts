import { Request } from "express";
import { IFrontUser } from "./user";

export interface RequestWithUserRole extends Request {
  user?: IFrontUser,
}
