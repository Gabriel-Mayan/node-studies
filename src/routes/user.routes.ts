import { Router } from "express";

import { createUser } from "@controllers/users";
import { createUserSchema } from "@validations/userSchema";
import { validateRequest } from "@middlewares/validateRequest";

const routes = Router();

routes.post("/user/create", validateRequest(createUserSchema, "body"), createUser);

export { routes };
