import User from "../models/UserModel";
import asyncHandler from "../middlewares/asyncHandler";

const createUser = asyncHandler(async(req,res)=>{
    res.send("hello")

})
export {createUser};
