import mongoose from "mongoose"

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/ecommerce");
        console.log("database has been connected")
    }
    catch(err){
        console.log(`error is ${err.message}`);

    }

}
export default connectDB