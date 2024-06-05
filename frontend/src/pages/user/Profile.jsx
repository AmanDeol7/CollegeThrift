import {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useProfileMutation } from '../../redux/api/usersApiSlice'

const Profile = () => {
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const dispatch = useDispatch();
const {userInfo} = useSelector(state => state.auth);
const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
// if(!userInfo){
//     toast.error("You are not logged in");
//     return
// }
useEffect(()=>{
  

    try{
    setUsername(userInfo.username);
    setEmail(userInfo.email);
    }catch(error){
        toast.error("You are not logged in");
    }   


}, [userInfo.email, userInfo.username])


const handleSubmit = async(e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        toast.error("Passwords do not match")
        return;
    }else {
        try {
            const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap();
            dispatch(setCredentials({...res}));
            toast.success("Profile updated successfully")



            
        } catch (error) {
            toast.error(error?.data?.message || error.message)
            console.log(  error.message)
        }


    }



}



  return (
    <>
    <div className='container mx-auto p-4 mt-[10rem]'>
        <div className="flex justify-center align-center md:flex md:space-x-4 ">
        <div className='md:w-1/3'>
        <h2 className='text-2xl for-semibold mb-4 text-white'>Update Profile</h2>
        

        <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label  className="block text-white mb-2">Name</label>
                    <input type="text"  placeholder='Enter Name' className='form-input p-4 rounded-sm w-full  bg-neutral-700  text-white' value={username} onChange={(e)=> setUsername(e.target.value)}/>
                 </div>

                 <div className='mb-4'>
                    <label  className="block text-white mb-2">Email</label>
                    <input type="email"  placeholder='Enter Email' className='form-input p-4 rounded-sm w-full  bg-neutral-700 text-white' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                 </div>


                  <div className='mb-4'>
                    <label  className="block text-white mb-2">Password</label>
                    <input type="password"  placeholder='Enter Password' className='form-input p-4 rounded-sm w-full  bg-neutral-700 text-white' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                 </div> 

                 <div className='mb-4'>
                    <label  className="block text-white mb-2">Confirm Password</label>
                    <input type="password"  placeholder='Confirm Password' className='form-input p-4 rounded-sm w-full  bg-neutral-700 text-white' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>


                <div className="flex justify-between">
                    <button type="submit" className='bg-pink-500 text-white px-4 py-2 hover:bg-pink-600 rounded cursor-pointer my-[1.5rem] '>{loadingUpdateProfile ?"Updating...":"Update"}</button>
                    <Link to="/user-orders" className='bg-pink-600 text-white px-4 py-2 hover:bg-pink-700 rounded cursor-pointer my-[1.5rem] '>My Orders</Link>
                </div>

                 </div> 





        </form>

        </div>
        {loadingUpdateProfile && <Loader />}

        </div>
    </div>
    </>
  )
}

export default Profile