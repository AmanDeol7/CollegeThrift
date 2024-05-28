import  {createUser, loginUser}  from "../controllers/UserController.js";
import express from "express"

const router = express.Router();

router.route("/").post(createUser);
router.post("/auth" , loginUser )

export default router

