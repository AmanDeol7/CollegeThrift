
import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";


const createCategory = asyncHandler(async(req,res)=>{

    try {
        const {name} = req.body;
        if(!name){
            return res.json({error: "Please fill the name"})
        }
        const existingCategory = await Category.findOne({name}) ;
         if(existingCategory){
                return res.json({error: "Category already exists"})
        }

        


        const category = await new Category({name})
        res.json(category)
        await category.save()
        console.log(name)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Category not created"})
    }
})

const updateCategory = asyncHandler(async(req,res)=>{


})

export {createCategory,updateCategory}