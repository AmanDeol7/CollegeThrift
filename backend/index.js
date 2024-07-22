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

dotenv.config()
const port =process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/" , (req,res)=> {
    res.send("Hello World");

})
app.use("/api/users", userRoute)
app.use("/api/category", categoryRoutes)
app.use("/api/products", productRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/orders", orderRoutes)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.listen(port, () => {
    console.log(`server running on port ${port}`);

})

