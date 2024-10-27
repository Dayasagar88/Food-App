import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";
import { addMenu, deleteMenu, editMenu } from "../controller/menu.controller";


const router = express.Router();

router.route("/add-menu").post(isAuthenticated, upload.single("image"), addMenu);
router.route("/edit-menu/:id").put(isAuthenticated, upload.single("image"), editMenu);
router.route("delete-menu/:id").delete(isAuthenticated, deleteMenu);

export default router;