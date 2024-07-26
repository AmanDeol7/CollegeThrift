import mongoose from "mongoose"
import {Schema} from "mongoose"


const UserSchema = Schema({
    
    username: {type:String , required: true},
    email: {type:String, required:true, unique:true},
    password:{type:String , required:true},
    isAdmin: {type:Boolean, default: false}
}, {timestamps: true})

const User = mongoose.model("User", UserSchema);
export default User


