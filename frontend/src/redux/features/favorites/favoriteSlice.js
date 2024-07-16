

import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice =  createSlice({
    name: "favourites",
    initialState: [],
    reducers: {
      addToFavourites:(state, action) => {
        if(!state.some((product)=>{
          product._id === action.payload._id 
          
        })){//this line of code checks if there is no element in the state array that has the same _id value as the _id value of the action.payload object. If this condition is true, the code inside the if block will be executed.
          state.push(action.payload)

        }
      },
      removeFromFavourites: (state, action) => {
        return state.filter((product) => product._id !== action.payload._id) //remove product with matching id

      },  
      setFavourites: (state, action) => {
        return action.payload //set favourites from local storage
      }
    }


})

export const {addToFavourites, removeFromFavourites, setFavourites} = favouriteSlice.actions
export const selectFavouriteProduct = (state) => state.favourites 
export default favouriteSlice.reducer

