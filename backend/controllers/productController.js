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


const getProducts = asyncHandler(async (req, res) => {
        try {

            const pageSize = 6; // used for frontend pagination
            const keyword = req.query.keyword ? {name: { $regex: req.query.keyword, $options: "i"}} : {}; // for search bar
            const count = await Product.countDocuments({...keyword});
            const products = await Product.find({...keyword}).limit(pageSize)

            res.json({products, page:1, pages:Math.ceil(count / pageSize),  hasMore : false})

            
        } catch (error) {
            console.log(error)
            res.status(400).json(error.message, "server error calledd form getproducts")
        }


})

const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404)
            throw new Error("product not foundd")


        }
        else{
            res.json(product)
        }

        
    } catch (error) {
            console.log(error)

            res.status(404).json(error.message, "product not found");

    }


})

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        
        const products = await Product.find({}).populate('category').limit(12).sort({createdAt: -1});
        res.json(products); 


    } catch (error) {
        console.log(error)

        res.status(400).json(error.message, "error in getting all products");
    }
})


const addReview = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        else{
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
            if(alreadyReviewed){

                 res.status(400)
                throw new Error("Product already reviewed");

            }
            else{
                const review = {
                    name: req.user.username,
                    rating: Number(rating),
                    comment,
                    user: req.user._id
                }
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
                await product.save();
                res.status(201).json({message: "Review added"});

            }
        
        }


    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)

        
    }


})

const getTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({rating:-1}).limit(4)
        res.json(products);


    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

const getNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({createdAt:-1}).limit(5)
        res.json(products);


    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
})

export {addProduct , updateProduct , deleteProduct , getProducts ,getProductById, getAllProducts , addReview, getTopProducts , getNewProducts}
