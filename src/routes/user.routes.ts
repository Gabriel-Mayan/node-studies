import { Router } from "express";

import { createUser, updateUser } from "@controllers/user";
import { createUserSchema, updateUserSchema } from "@validations/userSchema";

import authentication from "@middlewares/authentication";
import validateRequest from "@middlewares/validateRequest";

const routes = Router();

routes.post("/create", validateRequest(createUserSchema, "body"), createUser);
routes.patch("/edit", authentication, validateRequest(updateUserSchema, "body"), updateUser);

export { routes };
