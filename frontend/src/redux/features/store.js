import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import  authReducer  from "./auth/authSlice";
import favouritesReducer  from "./favorites/favoriteSlice"
import { getFavoritesFromLocalStorage } from "../../Utils/localStorage";
import cartSliceReducer from "./cart/cartSlice";
const initalFavourites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favouritesReducer,
        cart: cartSliceReducer,
        
        

        
    },

    preloadedState: {
        favorites: initalFavourites,

    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,


});

setupListeners(store.dispatch);
export default store;
