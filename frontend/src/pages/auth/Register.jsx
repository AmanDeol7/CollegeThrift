import {useState ,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'    
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'

import { useLocation } from 'react-router-dom'



const Register = () => {
   const [username , setUsername] = useState("");
   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate() ;
    const [register , {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector(state => state.auth);
    const {search} = useLocation(); //search will have query parameters
    const sp = new URLSearchParams(search); // it get the query parameters from the search
    const redirect = sp.get('redirect') || "/" //. If the "redirect" parameter is present in the query string, its value is assigned to the redirect variable. Otherwise, the default value of "/" is assigned.
    useEffect(()=> {
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo , navigate, redirect])

    const handleSubmit = async(e) => {

        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
          }
       
          try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            
            navigate(redirect);
            toast.success("User successfully registered");
          } catch (err) {
            console.log(err);
            if(username ||email || password === "") {
              toast.error("All fields are required")
            }
          
        }
    
      };




  return (
    <>
    <section className="pl-[10rem] flex flex-wrap ">
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className="text-2xl font-semibold mb-4 text-white">Register</h1>

            <form onSubmit={handleSubmit} className='container w-[40rem] '>
                <div className="my-[2rem]">
                    <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
                    <input type="text" id="username" className="mt-1 rounded w-full  p-2 bg-neutral-700 text-white" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} /> 
                </div> 

                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                    <input type="email" id="email" className="mt-1 rounded w-full  p-2 bg-neutral-700 text-white" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} /> 
                </div> 

                <div className="my-[2rem]">
                    <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                    <input type="password" id="password" className="mt-1 rounded w-full  p-2 bg-neutral-700 text-white" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}  /> 
                </div> 

                <div className="my-[2rem]">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password </label>
                    <input type="password" id="confirmPassword" className="mt-1 rounded w-full  p-2 bg-neutral-700 text-white" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /> 
                </div> 







                <button disabled={isLoading} type="submit" className='bg-pink-500 text-white px-4 py-2  rounded cursor-pointer my-[1.5rem] '>{isLoading ?"Registering...":"Register"}</button>

                {isLoading&&<Loader />}


            </form>

            <div className="mt-4">
          <p className="text-white">Already have an  account? { " "}
          <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p> 
        </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="h-[55rem] w-[57%] xl:block md:hidden sm:hidden l:hidden rounded-lg"
        />
    </section>
    
    
    </>
  )
}

export default Register