import "express-async-errors";
import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "@docs/index";

import { routes as userRoutes } from "./user.routes";
import { routes as loginRoutes } from "./login.routes";

const router = Router();

router.use("/api-docs", serve, setup(swaggerDocument));
router.get("/", (_, response) => response.status(200).json({ message: "Server is running..." }));

router.use("/user", userRoutes);
router.use("/login", loginRoutes);

export { router };
