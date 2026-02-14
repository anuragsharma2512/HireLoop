import { Router } from "express";
import { login, register } from "../controllers/auth.controllers.js";
import verifyToken from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", verifyToken, (req,res)=>{
  res.json(req.user);
});

export default router;