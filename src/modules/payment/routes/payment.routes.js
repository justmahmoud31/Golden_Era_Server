import express from "express";
import { protect } from "../../../middlewares/authMiddleware.js";
import { createCheckoutSession } from "../controllers/payment.controller.js";
import { verifySession } from "../controllers/verifypayment.controller.js";


const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);
router.post("/verify-session", verifySession);

export default router;
