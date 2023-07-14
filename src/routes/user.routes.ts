import { Router } from "express";

import { updateUser } from "@controllers/user";
import { updateUserSchema } from "@validations/userSchema";

import authentication from "@middlewares/authentication";
import validateRequest from "@middlewares/validateRequest";

const routes = Router();

routes.patch("/edit", authentication, validateRequest(updateUserSchema, "body"), updateUser);

export { routes };
