import "express-async-errors";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";

import { routes as userRoutes } from "./user.routes";
import { routes as loginRoutes } from "./login.routes";

const router = Router();

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));
router.get("/", (_, response) => response.status(200).json({ message: "Server is running..." }));

router.use(userRoutes);
router.use(loginRoutes);

export { router };
