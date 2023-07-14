import { Router } from "express";
import { serve, setup } from "swagger-ui-express";

import swaggerDocument from "@docs/index";

import validateRequest from "@middlewares/validateRequest";

import { createUser } from "@controllers/user";
import { createUserSchema } from "@validations/userSchema";

const routes = Router();

routes.get("/", (_, response) => response.status(200).json({ message: "Server is running..." }));
routes.post("/user/create", validateRequest(createUserSchema, "body"), createUser);

routes.use("/api-docs", serve, setup(swaggerDocument));

export { routes };
