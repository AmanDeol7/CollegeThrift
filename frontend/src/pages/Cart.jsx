import {Link , useNavigate} from  "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { FaTrash } from "react-icons/fa"
import { addToCart } from "../redux/features/cart/cartSlice"

const Cart = () => {
    const navigate  = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
  return (
    <>
    <div className="container flex justify-around items-start flex-wrap mx-auto mt-8 ">
        {cartItems.length ===0 ? (<div>Your Cart is empty.   <Link to="/shop" className="underline">Go Back</Link></div>):(<div></div>)}
    </div>
    
    
    </>
  )
}

export default Cart