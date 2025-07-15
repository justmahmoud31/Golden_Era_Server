import express from "express";
import { protect } from '../../middlewares/authMiddleware.js';
import { addReview } from "./controllers/addreview.controller.js";
import { getReviews } from "./controllers/getReviews.controller.js";

const router = express.Router();
router.post("/", protect, addReview);
router.get("/", getReviews);

export default router;
