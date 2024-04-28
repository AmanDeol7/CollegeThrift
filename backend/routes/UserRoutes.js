import  createUser  from "../controllers/UserController.js";
import express from "express"

const router = express.Router();

router.route("/").post(createUser);

export default router

