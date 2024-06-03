import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import { escapeSelector } from "jquery";

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

    const newUser = new User({username , email, password });

     


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
            

            res.status(201).json({
              _id: userExists._id,
              username: userExists.username,
              email: userExists.email,
              isAdmin: userExists.isAdmin,
            });
       }
       else{
        res.status(400).send("Invalid credentials")
       }
    }
    return

  
 })


 const logoutControl = asyncHandler(async(req,res) =>{
    res.cookie("jwt", "", {
        expires: new Date(0),
        httpOnly: true,
 })
  res.status(200).json({ message: "Logged out successfully" });;

 }) 


const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({})
    res.json(users);





})

const getCurrentProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
  });


const updateUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;  
    

    if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(req.body.password, salt); 
        user.password = hashedPassword;
    }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        }

        )
    }
    else{
        res.status(404);
        throw new Error("User not found");
     
    }
})

const deleteUser = asyncHandler(async(req,res)=> {
    const user = await User.findById(req.params.id);
    if(user) {
        if(user.isAdmin) {
            res.status(400).json({message: "admin user cannot be deleted"});

        }
        else{
            await User.deleteOne({_id: user._id})
            res.json({message: "User deleted"} )

        }
    }
    else{
        res.status(404);
        res.json({message: "User not found in db"})


    }

})
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
  
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
  
  const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });






export   {createUser, loginUser, logoutControl , getAllUsers, getCurrentProfile, updateUserProfile , deleteUser , getUserById, updateUserById}
