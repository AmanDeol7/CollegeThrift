import {Navigate , Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'


const PrivateRoute = () => {
  const userInfo =  useSelector(state =>state.auth)

  

  return userInfo?(<Outlet />):(<Navigate to="login" replace/>) //replace is used to replace the value of current location in history stack with new value "login"




  
}

export default PrivateRoute