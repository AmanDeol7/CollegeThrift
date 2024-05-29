import  {createUser, loginUser, logoutControl, getAllUsers , getCurrentProfile , updateUserProfile, deleteUser , getUserById, updateUserById}  from "../controllers/UserController.js";
import express from "express"
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.route("/").post(createUser).get(authenticate,authorizeAdmin,getAllUsers);
router.post("/auth" ,  loginUser )
router.post("/logout", logoutControl)
router.route("/profile").get(authenticate, getCurrentProfile).put(authenticate, updateUserProfile)
router.route("/:id").delete(authenticate, authorizeAdmin,deleteUser).get(authenticate, authorizeAdmin,getUserById).put(authenticate, authorizeAdmin,updateUserById);

export default router

