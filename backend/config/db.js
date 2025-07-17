import mongoose from "mongoose"

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database has been connected")
    }
    catch(err){
        console.log(`error is ${err.message}`);
        process.exit(1);
    }

}
export default connectDB