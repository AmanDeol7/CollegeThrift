import {Link , useNavigate} from  "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { FaTrash } from "react-icons/fa"
import { addToCart , removeFromCart} from "../redux/features/cart/cartSlice"

const Cart = () => {
    const navigate  = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const addToCartHandler = (product, qty) => {
      dispatch(addToCart({ ...product, qty }));
    };
  
    const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
    };
  
    // const checkoutHandler = () => {
    //   navigate("/login?redirect=/shipping");
    // };
  
  return (
    <>
    <div className="container flex justify-around items-start flex-wrap mx-auto mt-8 ">
        {cartItems.length ===0 ? (<div>Your Cart is empty.   <Link to="/shop" className="underline">Go Back</Link></div>):(<div className= "flex flex-col w-[80%] ">
          <div className="text-2xl font-semiboldl mb-4"> Shopping Cart</div>
           {cartItems.map((item) => (
            <div key={item._id} className="flex items-center mb-[1rem] pb-2">
              <div className="w-[7rem] h-[7rem]">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded " />

              </div>
              <div className="flex-1 ml-3">
                <Link to={`/product/${item._id}`} className="text-pink-500">{item.name}</Link>
                <div className="mt-5  text-white">{item.brand}</div>
                <div className="mt-5 text-white font-bold">$ {item.price}</div>
              </div>
              <div className="w-24">
                    <select
                      className="w-full text-white bg-slate-900 p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>

            </div>
           ))} 
        </div>)}
    </div>
    
    
    </>
  )
}

export default Cart