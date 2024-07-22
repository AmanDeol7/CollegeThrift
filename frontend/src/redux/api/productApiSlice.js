    
import { PRODUCT_URL , UPLOAD_URL } from "../features/constants";
import  {apiSlice}  from "./apiSlice"; 

 export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query:({keyword}) => ({
                url: `${PRODUCT_URL}`,
                params: {keyword}

            }),
            
            keepUnusedDataFor: 5,
            providedTags: ["Product"],



        }),
        getProductById: builder.query({
            query: (id) =>({
                url:`${PRODUCT_URL}/${id}`,
                providesTags: (result,error, id) => {
                    return [{type:"Product", id:id}]   
                }
            })
        }),
        getAllProducts: builder.query({
            query: () =>  ({
            url:`${PRODUCT_URL}/allproducts`,
        })
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
              url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
          }),

        addProduct: builder.mutation({
            query: (product) => ({
                url: `${PRODUCT_URL}`,
                method:"POST",
                body: product
            }),
            invalidatesTags: ["Product"]
        }),
        updateProduct: builder.mutation({
            query: ({id, formData}) => ({
                url: `${PRODUCT_URL}/${id}`,
                method:"PUT",
                body: formData
            }),
            // invalidatesTags: ["Product"]
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method:"DELETE"
            }),
            providesTags: ["Product"],


           
        }),

        addReview: builder.mutation({
            query:(data) => ({
                url: `${PRODUCT_URL}/${data.id}/reviews`,
                method:"POST",
                body:data
            })
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/top`,
            }),
            keepUnusedDataFor: 5,

        }),

        getNewProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/new`

            }),
            keepUnusedDataFor: 5,
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
              url: `${UPLOAD_URL}`,
              method: "POST",
              body: data,
            }),
          }),
        
          getFilteredProducts: builder.query({
            query: ({ checked, radio }) => ({
              url: `${PRODUCT_URL}/filtered-products`,
              method: "POST",
              body: { checked, radio },
            }),
          }),




        
    })

})


export const {   useGetProductByIdQuery,
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useGetAllProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useAddReviewMutation,
    useGetTopProductsQuery,
    useGetNewProductsQuery,
    useUploadProductImageMutation,
    useGetFilteredProductsQuery,
    } = productApiSlice;

