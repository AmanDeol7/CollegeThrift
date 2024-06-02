import {useState} from 'react'
import {AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa' ;
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import "./Navigation.css"
import { useSelector , useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/auth/authSlice';



const Navigation = () => {
  const {userInfo} = useSelector(state => state.auth)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showSidebar, setShowSideBar] = useState(false)
  const toggleDrowpdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const toggleSideBar = () => {
    setShowSideBar(!showSidebar)
  }

  const closeSideBar = () => {  
    setShowSideBar(false)
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLoginMutation();

  const handleLogout = async() => {
    try {
          await logoutApiCall().unwrap() //unwrap() is used to get the actual data from the promise , inline error handling is done by unwrap();
          dispatch(logout());
          navigate('/login');
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div style ={{zIndex: 999}} className={`${showSidebar?"hidden": "flex"} xl:flex lg:flex md:hidden sm : hidden flex-col  justify-between p-4 text-white bg-black w-[4%] hover:w-[14%] h-[100vh] fixed ` }
    id='navigation-container' >

      <div className="flex flex-col justify-center space-y-4">
        <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineHome size={26} className='mr-2 mt-[3rem]' />
          <span className="hidden nav-item-name mt-[3rem]">Home</span>
          </Link>


          <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShopping size={26} className='mr-2 mt-[3rem]' />
          <span className="hidden nav-item-name mt-[3rem]">Shop</span>
          </Link>

          <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShoppingCart size={26} className='mr-2 mt-[3rem]' />
          <span className="hidden nav-item-name mt-[3rem]">Cart</span>
          </Link>

         
         

          <Link to="/favourites " className="flex items-center transition-transform transform hover:translate-x-2">
          <FaHeart size={26} className='mr-2 mt-[3rem]' />      
          <span className="hidden nav-item-name mt-[3rem]">Favourites</span>
          </Link>

          <div className="relative">
            <button onClick={toggleDrowpdown} className='flex-items-center text-gray-8000 focus:outline-none mt-9'>
            {userInfo ? (
            <span className="text-white my-5 text-s">{userInfo.username}</span>
          ) : (
            <></>
          )}
               </button>
          </div>
          <ul>
            <li>
                <Link to="/login" className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineLogin size={26} className='mr-2 mt-[3rem]' />      
                    <span className="hidden nav-item-name mt-[3rem]">Login</span>
                </Link>
            </li>
            <li>
                <Link to="/register" className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineUserAdd size={26} className='mr-2 mt-[3rem]' />      
                    <span className="hidden nav-item-name mt-[3rem]">Register</span>
                </Link>
            </li>
          </ul>
      </div>
      
    </div>
  )
}

export default Navigation