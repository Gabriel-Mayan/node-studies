import { Router } from "express";

import validateRequest from "@middlewares/validateRequest";

import { getUserByIdSchema } from "@validations/adminSchema";
import { getUserById, getAllUsers } from "@controllers/admin";

const routes = Router();

routes.get("/find-all-users", getAllUsers);
routes.get("/find-user-by-id", validateRequest(getUserByIdSchema, "params"), getUserById);

export { routes };
