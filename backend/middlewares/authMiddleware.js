import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'


const authenticate = asyncHandler(async(req, res, next) => {
    let token
    token = req.cookies.jwt

    if(token){
      
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const user= await User.findById(decoded.userId).select('-password') 
            if (!user) {
                return res.status(401).json({ message: 'Not Authorized, user not found' });
              }
              req.user = user

            next()
            
        } catch (error) {
            res.status(401).json({ message: 'Not Authorized, token failed' });
            
        }
    } else {
        return res.status(401).json({ message: 'Not Authorized, no token' });
      }
})


const authorizeAdmin = asyncHandler((req,res,next) => {
    if (req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401).send("Not authorized as admin")
    }
})

export {authenticate, authorizeAdmin}