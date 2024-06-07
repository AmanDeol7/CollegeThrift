
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
    try {
        const {name} = req.body;
        const {categoryId} = req.params;
        const category = await Category.findById({ _id: categoryId});


        if(!category){
            return res.status(404).json({error: "Category not found"})
        }

        category.name = name;
        const updatedCategory = await category.save();
        console.log(updatedCategory)
        res.json(updatedCategory);
        


    } catch (error) {
        console.log(error);
        res.status(400).json({error: "Category not updated"})

    }

})

const deleteCategory = asyncHandler(async(req,res)=>{
    try {
        const {categoryId} = req.params;    
        const category = await Category.findById({ _id: categoryId});
        if(!category){
            return res.status(404).json({error: "Category not found"})
        }
        const deletedCategory = await category.deleteOne({ _id: categoryId})
        res.json({message: "Category deleted", deletedCategory,category })

    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Category not deleted"})
        
    }

})

export {createCategory,updateCategory, deleteCategory}