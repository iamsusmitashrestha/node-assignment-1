import { Router } from "express";
import { addUser, login } from "../controllers/user.controller";

const router = Router();
router.post("/addUser", addUser);
router.post("/login", login);

export default router;
