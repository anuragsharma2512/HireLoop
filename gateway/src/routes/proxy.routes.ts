import { Router } from "express";
import { authProxy } from "../proxy/auth.proxy.js";
import { coreProxy } from "../proxy/core.proxy.js";

const router = Router();

router.use("/api/auth", authProxy);
router.use("/api/core", coreProxy);

export default router;