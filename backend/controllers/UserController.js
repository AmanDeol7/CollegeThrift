import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";


 const createUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
      
    }
    const newUser = new User({username , email, password});
        try {
            await newUser.save();
            console.log("new user created");
            
            res.status(201).json(newUser);
        }
        catch (error) {
            console.log(error)
            res.status(500);
            throw new Error("Server error");
    }

    
})
export default createUser
