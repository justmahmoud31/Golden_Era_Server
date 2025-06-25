import express from "express";
import { createCategory } from "./Controllers/addcategory.controller.js";
import { updateCategory } from "./Controllers/updateCategory.controller.js";
import { deleteCategory } from "./Controllers/deleteCategory.controller.js";
import { adminOnly, protect } from '../../middlewares/authMiddleware.js';
import { getAllCategories } from "./Controllers/getAllCategories.controller.js";


const router = express.Router();

// Public
router.get("/", getAllCategories);

// Admin only
router.post("/", protect, adminOnly, createCategory);
router.patch("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;
