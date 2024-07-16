import { useSelector } from "react-redux"
import { selectFavouriteProduct } from "../../redux/features/favorites/favoriteSlice"
import Product from "./Product"


const Favourites = () => {
    const favorites = useSelector((state)=> state.favorites)
    console.log(favorites)
    

    return (
        <div className="ml-[10rem]">
          <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
            FAVORITE PRODUCTS
          </h1>
        
          <div className="flex flex-wrap">
            {favorites.map((product) =>{
                return(
                    <Product key={product._id} product={product} />
                )
            })}
      </div>

       
        </div>
       
      );
   
}

export default Favourites