import { useState, useEffect } from "react"
import {useNavigate, useParams} from "react-router-dom"
import { useUpdateProductMutation ,  useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation} from "../../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"


const ProductUpdate = () => {
    const params = useParams();
    const{data: productData} = useGetProductByIdQuery(params._id);
    const [image, setImage] =   useState(productData?.image  || " ");
    const [name, setName] = useState(productData?.name || " ")
    const [description, setDescription] = useState(productData?.description || " ")
    const [price, setPrice] = useState(productData?.price|| " ")
    const [category, setCategory] = useState(productData?.category|| " ")
    const [brand, setBrand] = useState(productData?.brand|| " ")
    const [stock, setStock] = useState(productData?.countInStock|| " ")
    const [quantity,  setQuantity] = useState(productData?.quantity || " ")
    const navigate = useNavigate();
    const {data: categories =[]}  = useFetchCategoriesQuery();
    const {uploadImage} = useUploadProductImageMutation();
    const {updateProduct} = useUpdateProductMutation();
    const {deleteProduct} = useDeleteProductMutation();


    useEffect(() => {
        if(productData && productData._id){
            setName(productData.name)
            setDescription(productData.description)
            setImage(productData.image)
            setPrice(productData.price)
            setCategory(productData.category)
            setBrand(productData.brand)
            setStock(productData.Stock)
            setName(productData.name)
        }
    },[productData]) 

    




  return (
    <div>ProductUpdate</div>
  )
}

export default ProductUpdate