
import express from "express"
import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js";
import { createCategory , updateCategory , deleteCategory, getCategory, listCategory} from "../controllers/categoryController.js";
 const router  = express.Router();

router.route("/").post( authenticate, authorizeAdmin, createCategory )
router.route("/:categoryId").put( authenticate, authorizeAdmin, updateCategory ).delete( authenticate, authorizeAdmin, deleteCategory )
// router.route("/categories").get( getCategories)
router.route("/categories").get(listCategory);
router.route("/:id").get(getCategory)

export default router   