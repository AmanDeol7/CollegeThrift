import jwt from 'jsonwebtoken';

const generateToken = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.SECRET,{expiresIn: "30d"})

    //set JWT token as HTTP only

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV,
        sameSite: "strict",
        maxAge: 30*24*60*60*1000} )
        return token;

}
export default generateToken;
