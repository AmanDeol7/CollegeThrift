import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

 const createUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){ //little bit of validation
        res.status(400);
        throw new Error("Please fill all the fields");
      
    }
    const userExists =  await User.findOne({email});
    if(userExists) {
        res.status(400).send("User already exists.")

    }

    const newUser = new User({username , email, password});

     


    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt); //hashed password

        try {
            await newUser.save();
            console.log("new user created");
            createToken(res, newUser._id);

            res.status(201).json(newUser);
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Error -  User not created");
            
    }

    
})

const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body;
    const userExists =  await User.findOne({email})

    if(userExists) {
       const isPasswordValid = await bcrypt.compare(password, userExists.password)
       if(isPasswordValid) {
            createToken(res, userExists._id) 
            

            res.status(201).send(`Welcome  ${userExists.username}`)
       }
    }
    return

  
 })


 const logoutControl = asyncHandler(async(req,res) =>{
    res.cookie("jwt", "", {
        expires: new Date(0),
        httpOnly: true,
 })
  res.status(200).send("Successfully logged out");
  
 })
export   {createUser, loginUser, logoutControl}
