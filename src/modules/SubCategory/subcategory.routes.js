import express from "express";
import { getAllSubCategories } from "./Controllers/getAllSubCategories.controller.js";
import { adminOnly, protect } from "../../middlewares/authMiddleware.js";
import { updateSubCategory } from "./Controllers/updateCategory.controller.js";
import { deleteSubCategory } from "./Controllers/deletesubCategory.controller.js";
import { createSubCategory } from "./Controllers/addSubCategory.controller.js";
const router = express.Router();

router.get("/", getAllSubCategories);
router.post("/", protect, adminOnly, createSubCategory);
router.patch("/:id", protect, adminOnly, updateSubCategory);
router.delete("/:id", protect, adminOnly, deleteSubCategory);

export default router;
