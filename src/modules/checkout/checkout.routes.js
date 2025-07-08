import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import { getCheckoutSummary } from "./controller/checkout.controller.js";


const router = express.Router();
router.get('/',protect,getCheckoutSummary);
export default router;