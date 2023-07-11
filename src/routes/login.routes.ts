import { Router } from "express";

import { login } from "@controllers/login";
import { loginSchema } from "@validations/loginSchema";

import validateRequest from "@middlewares/validateRequest";

const routes = Router();

routes.post("/", validateRequest(loginSchema, "body"), login);

export { routes };
