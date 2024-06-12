import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";


const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name,  brand , quantity, category, description,   price } = req.fields;
        
        //validation

        switch (true) {

            case !name:
                return res.json({ error: "Name is required" });
        
            case !brand:
                return res.json({ error: "brand is required" }) ;

            case !quantity:
                return res.json({ error: "quantity is required" });

            case !category:
                return res.json({ error: "category is required" })

            case !description:
                return res.json({ error: "description is required" })

            case !price:
                return res.json({ error: "price is required" })

            
        }

        const product = new Product({
          ...req.fields,
        });
        await product.save();
        res.status(201).json(product);



    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);

    }

})


const updateProduct = asyncHandler(async (req, res) => {

    try {
        const { name,  brand , quantity, category, description,   price } = req.fields;
        
        //validation

        switch (true) {

            case !name:
                return res.json({ error: "Name is required" });
        
            case !brand:
                return res.json({ error: "brand is required" }) ;

            case !quantity:
                return res.json({ error: "quantity is required" });

            case !category:
                return res.json({ error: "category is required" })

            case !description:
                return res.json({ error: "description is required" })

            case !price:
                return res.json({ error: "price is required" })

            
        }

        const product = await Product.findByIdAndUpdate(req.params.id , {...req.fields}, {new: true}); // new true returns the updated object

        await product.save();

        res.json(product);




        
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);
    }


})


const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
        
        
        
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})


export {addProduct , updateProduct , deleteProduct}