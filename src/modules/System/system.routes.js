import express from "express";
import { getStats } from "./controllers/stats.controller.js"; 
import { protect, adminOnly } from "../../middlewares/authMiddleware.js";
import { getOrderInsights } from "./controllers/getOrderStats.controller.js";

const router = express.Router();

router.get("/", protect, adminOnly, getStats);

router.get("/insights", protect, adminOnly, getOrderInsights);

export default router;
