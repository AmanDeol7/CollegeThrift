import {useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router'
import { useUpdateProductMutation, useUploadProductImageMutation ,useGetProductByIdQuery, useDeleteProductMutation} from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import AdminMenu from './AdminMenu'




const ProductUpdate = () => {
    const params = useParams();
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [ description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState(0)
    const [imageURL, setImageURL] = useState(null)
    const navigate= useNavigate();
    const {data: productData } = useGetProductByIdQuery(params.id);
    


    const [deleteProduct]  =  useDeleteProductMutation();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();

    const {data: categories} = useFetchCategoriesQuery();


    useEffect(() => {
        if(productData && productData._id){
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.category?._id)
            setBrand(productData.brand)
            setQuantity(productData.quantity)
            setStock(productData.countInStock)
            setImageURL(productData.image)
        }
    }, [productData]);


    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image" , e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap();    
            toast.success("Image uploaded successfully")
            setImageURL(res.image)
         
              
            
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message ||error.error)
        }
    }

    const handleSubmit = async(e) => {
        console.log("from handleSubmit")
      e.preventDefault();

        try {
          const productData = new FormData();
          productData.append("image", image);
          productData.append("name", name);
          productData.append("description", description);
          productData.append("price", price);
          productData.append("category", category);
          productData.append("brand", brand);
          productData.append("quantity", quantity)
          productData.append("countInStock", stock);



          const {data} = await updateProduct({ id: params._id, formData: productData })

        console.log("product update");

          if(data?.error) {
            toast.error("Product Update failed.")
            console.log(data.error);

          }
          else{
            toast.success("data.name successfully created")
            navigate("/admin/product/allproducts");


          }




        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message ||error.error , "update failed")

        }
    } 

    const handleDelete = async () => {
        try {
          let answer = window.confirm(
            "Are you sure you want to delete this product?"
          );
          if (!answer) return;
          console.log("deleting product");

          const { data } = await deleteProduct(params._id);
          toast.success(`"${data.name}" is deleted`);
          navigate("/admin/product/allproducts");
        } catch (err) {
          console.log(err);
          toast.error("Delete failed. Try again.", {
           
            autoClose: 2000,
          });
        }
      };

  return (
    <div className="container, xl:mx-[9rem] sm: mx-[0] ">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 ">Update Product</div>

          {imageURL && (
            <div className="text-center ">
              <img
                src={imageURL}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Change Image "}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={ "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-[20rem] p-4 mt-2 mb-2 border rounded-lg bg-[#101011] text-white"
                />
              </div>

              <div className="two ml-[5rem]">
                <label htmlFor="name block ">Price</label> <br />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-[20rem] p-4 mt-2 mb-2 border rounded-lg bg-[#101011] text-white"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-[20rem] p-4 mt-2 mb-2 border rounded-lg bg-[#101011] text-white"
                />
              </div>

              <div className="two ml-[5rem]">
                <label htmlFor="name block ">Brand</label> <br />
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-[20rem] p-4 mt-2 mb-2 border rounded-lg bg-[#101011] text-white"
                />
              </div>
            </div>

            <label htmlFor="" className=" my-5">
              {" "}
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 mt-2 mb-2 border rounded-lg bg-[#101011] text-white"
            />
            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count in Stock</label> <br />
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-[20rem] p-4 mt-2 mb-2  border rounded-lg bg-[#101011] text-white"
                />
              </div>
              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="w-[20rem] p-4 mt-2 mb-2  border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
                <button
                  onClick={handleSubmit}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
                >
                  Delete
                </button>
              </div>          </div>
        </div>
      </div>
    </div>
  );
    
  
}

export default ProductUpdate