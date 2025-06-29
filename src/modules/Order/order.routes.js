import express from "express";
import { adminOnly, protect } from "../../middlewares/authMiddleware.js";
import { placeOrder } from "./Controllers/addOrder.controller.js";
import { getUserOrders } from "./Controllers/getAllOrders.controller.js";
import { getAllOrders } from "./Controllers/getAdminOrders.controller.js";
import { updateOrderStatus } from "./Controllers/updateOrder.controller.js";



const router = express.Router();

// All routes below require user to be authenticated
router.use(protect);

// POST /api/orders - Place a new order from cart
router.post("/", placeOrder);

// GET /api/orders/my - Get logged-in user's orders
router.get("/my", getUserOrders);

router.get('/',protect,adminOnly,getAllOrders);
router.patch('/:id',protect,adminOnly,updateOrderStatus)
export default router;
