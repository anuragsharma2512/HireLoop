import { Router } from "express";
import verifyToken from "../middlewares/auth.middlewares";

const router = Router();

router.post("/create", verifyToken, );
router.get("/me", verifyToken, );
router.put("update", verifyToken, );

export default router;