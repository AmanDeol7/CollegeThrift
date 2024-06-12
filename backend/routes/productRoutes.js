
import express from "express";
import ExpressFormidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { addProduct , updateProduct , deleteProduct } from "../controllers/productController.js";

const router = express.Router();


router.route("/").post(authenticate, authorizeAdmin,  ExpressFormidable (), addProduct); // formidable is a middleware that parses incoming form data and attaches it to req.body;
router.route("/:id").put(authenticate, authorizeAdmin , ExpressFormidable() , checkId, updateProduct).delete( authenticate, authorizeAdmin, checkId, deleteProduct);


export default router;
