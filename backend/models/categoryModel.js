
import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = Schema({
    name: { type: String,
            trim: true,
            required: true,
            maxLength: 32,
            unique:true,
    },



})

const Category = mongoose.model("Category", categorySchema);
export default Category;