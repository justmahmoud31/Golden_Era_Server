import express from "express";
import { registerUser } from "./Controllers/signup.controller.js";
import { loginUser } from "./Controllers/login.controller.js";


const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
