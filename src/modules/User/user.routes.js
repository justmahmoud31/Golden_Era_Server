import express from "express";
import { adminOnly, protect } from "../../middlewares/authMiddleware.js";
import { getAllUsers } from "./Controllers/getAllUsers.controller.js";
import { blockUser } from "./Controllers/blockUser.controller.js";
import { unblockUser } from "./Controllers/unBlockUser.controller.js";
import { deleteUser } from "./Controllers/deleteUser.controller.js";
import { makeAdmin } from "./Controllers/addAdmin.controller.js";
const router = express.Router();
router.use(protect, adminOnly);
router.get("/", getAllUsers);
router.patch("/:id/block", blockUser);
router.patch("/:id/unblock", unblockUser);
router.delete("/:id", deleteUser);
router.patch("/:id/admin", makeAdmin);

export default router;
