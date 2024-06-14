import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { Route , RouterProvider , createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom';
import { Provider , } from 'react-redux'
import store from './redux/features/store.js'
import Register from './pages/auth/Register.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Login from './pages/auth/Login.jsx'
import Profile from './pages/user/Profile.jsx'
import UserList from './pages/admin/UserList.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import CategoryList from './pages/admin/CategoryList.jsx'
import ProductList from './pages/admin/ProductList.jsx'
import ProductUpdate from './pages/admin/ProductUpdate.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
         <Route path="/login" element={<Login />} />
         <Route path="/register" element ={<Register />}/>
         <Route path="" element={<PrivateRoute />}  >
              <Route path="/profile" element={<Profile />} />
         </Route>

         <Route path="/admin" element={<AdminRoute />} >
              <Route path="userslist" element={<UserList />} />
              <Route path="categorylist" element={<CategoryList />} />
              <Route path="productlist" element={<ProductList />} />
              <Route path="product/update/:id" element={<ProductUpdate />} />
              

         </Route>



    </Route>

  ),
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
  
)
