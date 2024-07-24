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
import AllProducts from './pages/admin/AllProducts.jsx'
import Home from './pages/Home.jsx'
import Favourites from './pages/Products/Favourites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Shipping from './pages/Orders/Shipping.jsx'
import Shop from './pages/Shop.jsx'

import Cart from './pages/Cart.jsx'
import PlaceOrders from './pages/Orders/PlaceOrders.jsx'
import Order from './pages/Orders/Order.jsx'

import {PayPalScriptProvider} from '@paypal/react-paypal-js'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
         <Route path="/login" element={<Login />} />
         <Route path="/register" element ={<Register />}/>
          <Route index={true} path="/" element={<Home />} /> 
          <Route path="/favorite" element={<Favourites />} />
         <Route path="" element={<PrivateRoute />}  >
              <Route path="/profile" element={<Profile />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/placeorder" element= {<PlaceOrders /> }/>
              <Route path="/order/:id" element={<Order />}/>

         </Route>
          <Route path="/product/:id" element={<ProductDetails  />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />

         <Route path="/admin" element={<AdminRoute />} >
              <Route path="userslist" element={<UserList />} />
              <Route path="categorylist" element={<CategoryList />} />
              <Route path="productlist/" element={<ProductList />} />
              <Route path="product/update/:id" element={<ProductUpdate />} />
              <Route path="product/allproducts" element={<AllProducts />} />


              

         </Route>



    </Route>

  ),
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <PayPalScriptProvider>
  <RouterProvider router={router} />
  </PayPalScriptProvider>
  </Provider>
  
)
