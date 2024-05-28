import  {createUser, loginUser, logoutControl}  from "../controllers/UserController.js";
import express from "express"

const router = express.Router();

router.route("/").post(createUser);
router.post("/auth" , loginUser )
router.post("/logout", logoutControl)
export default router

