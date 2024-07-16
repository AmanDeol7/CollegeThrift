import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToFavourites, removeFromFavourites, setFavourites } from "../../redux/features/favorites/favoriteSlice";


import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,

} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch(); // The dispatch function is responsible for sending actions to the Redux store, which triggers the corresponding reducers to update the state.
  const favorites = useSelector((state) => state.favorites) || [];

  const isFavorite = favorites.some((p) => p._id === product._id);
 


  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavourites(favoritesFromLocalStorage)); 
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavourites(product));
      // remove the product from the localStorage as well
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavourites(product));
      // add the product to localStorage as well
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart  className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};
   
export default HeartIcon;
