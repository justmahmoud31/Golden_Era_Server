import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import { getCart } from "./controllers/getUserCart.controller.js";
import { addToCart } from "./controllers/AddToCart.controller.js";
import { removeFromCart } from "./controllers/removeFromCart.controller.js";
import { clearCart } from "./controllers/clearCart.controller.js";
import { updateCartItemQuantity } from "./controllers/IncreaseDecreaseCart.controller.js";


const router = express.Router();
router.use(protect);
router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:productId", removeFromCart);
router.delete("/", clearCart);
router.patch("/",updateCartItemQuantity)

export default router;
