
import express from "express";
import ExpressFormidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { addProduct , updateProduct , deleteProduct , getProducts , getProductById ,getAllProducts ,  addReview , getTopProducts , getNewProducts} from "../controllers/productController.js";

const router = express.Router();


router.route("/").get(getProducts).post(authenticate, authorizeAdmin,  ExpressFormidable (), addProduct); // formidable is a middleware that parses incoming form data and attaches it to req.body;
router.route("/top").get(getTopProducts);
router.route("/new").get(getNewProducts);
router.route("/allproducts").get(getAllProducts)
router.route("/:id").get(getProductById).put(authenticate, authorizeAdmin , ExpressFormidable() , checkId, updateProduct).delete( authenticate, authorizeAdmin, checkId, deleteProduct);
router.route("/:id/reviews").post( authenticate,     checkId, addReview);

export default router;
