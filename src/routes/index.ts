import "express-async-errors";
import { Router } from "express";

import authentication from "@middlewares/authentication";
import verifyPermissions from "@middlewares/verifyPermissions";

import { routes as userRoutes } from "./user.routes";
import { routes as loginRoutes } from "./login.routes";
import { routes as adminRoutes } from "./admin.routes";
import { routes as publicRoutes } from "./public.routes";

const router = Router();

router.use("/", publicRoutes);
router.use("/login", loginRoutes);
router.use("/user", authentication, userRoutes);
router.use("/admin", authentication, verifyPermissions("Admin"), adminRoutes);

export { router };
