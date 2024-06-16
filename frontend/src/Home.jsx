import { Link , useParams } from "react-router-dom"

import { useGetProductByIdQuery } from "./redux/api/productApiSlice"
import Loader from "./components/Loader"
import Messages from "./components/Messages"
import Header from "./components/Header"

const Home = () => {
  const {keyword} = useParams();
//   const {data, isLoading, error} = useGetProductByIdQuery({keyword});


  return (
    <>
     <Header />
    </>
  )
}

export default Home