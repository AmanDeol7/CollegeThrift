//importing required packages
// import path from "path"
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import userRoute from './routes/UserRoutes.js'
//utils
import connectDB from "./config/db.js"
import categoryRoutes from './routes/CategoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import path from "path"
import cors from 'cors'





dotenv.config()
const port =process.env.PORT || 5000;

connectDB()

const app = express();
app.use(cors({
    
}

));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



// Serve the index.html file at the root path
const __dirname = path.resolve()
const clientBuildDirectory  = path.join(__dirname, "/../frontend/dist");
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildDirectory, "/index.html"));
});
app.use("/api/users", userRoute)
app.use("/api/category", categoryRoutes)
app.use("/api/products", productRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/orders", orderRoutes)

app.get("/api/config/paypal" , (req,res)=>{
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
    
})

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))



app.listen(port, () => {
    console.log(`server running on port ${port}`);

})

