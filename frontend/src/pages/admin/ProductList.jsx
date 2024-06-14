import {useState} from 'react'
import { useNavigate } from 'react-router'
import { useAddProductMutation, useUploadProductImageMutation } from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'




const ProductList = () => {

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

    const [uploadProductImage] = useUploadProductImageMutation();
    const [addProduct] = useAddProductMutation();
    const {data: categories} = useFetchCategoriesQuery();

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image" , e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap();
            
            setImage(res.image)
            setImageURL(res.image)
            toast.success(res.message);
           
          
            
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message ||error.error)
        }
    }

    const handleSubmit = async(e) => {
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



          const {data} = await addProduct(productData)
           
          if(data.error) {
            toast.error("Product Creation failed.")

          }
          else{
            toast.success("data.name successfully created")
            navigate("/");
            
          }




        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message ||error.error)

        }
    } 

  return (
    <div className="container, xl:mx-[9rem] sm: mx-[0] ">
      <div className="flex flex-col md:flex-row">
        {/* <AdminMenu /> */}
        <div className="md:w-3/4 p-3">
          <div className="h-12 ">Create Product</div>

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
              {image ? image.name : "Upload Image "}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
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

            <button onClick={handleSubmit} className='bg-pink-500 text-white px-4 py-2  rounded cursor-pointer my-[1.5rem] '>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
    
  
}

export default ProductList