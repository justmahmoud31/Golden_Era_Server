import express from "express";
import { protect } from '../../middlewares/authMiddleware.js';
import { getWishlist } from "./controller/getUserWishlist.controller.js";
import { addToWishlist } from "./controller/addToWishlist.controller.js";
import { removeFromWishlist } from "./controller/RemoveFromWishlist.controller.js";


const router = express.Router();

// All wishlist routes require authentication
router.use(protect);

// GET /api/wishlist - Get all wishlist items
router.get("/", getWishlist);

// POST /api/wishlist - Add a product to wishlist
router.post("/", addToWishlist);

// DELETE /api/wishlist/:productId - Remove a product from wishlist
router.delete("/:productId", removeFromWishlist);

export default router;
