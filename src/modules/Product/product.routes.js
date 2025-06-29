import express from "express";
import { getProducts } from "./Controllers/getAllProducts.Controller.js";
import { createProduct } from "./Controllers/addProduct.controller.js";
import { updateProduct } from "./Controllers/updateProduct.controller.js";
import { deleteProduct } from "./Controllers/deleteProduct.controller.js";
import { protect, adminOnly } from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/multer.js";
import { getProductPrice } from "./Controllers/getProductPrice.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/productByPrice/:id",getProductPrice);
router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    { name: "cover_images", maxCount: 5 },
    { name: "images", maxCount: 5 },
  ]),
  createProduct
);

router.patch("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
