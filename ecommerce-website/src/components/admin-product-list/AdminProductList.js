import React,{useContext,useEffect} from 'react'
import ProductContext from '../../store/ProductContext'
import {AdminProduct} from '../admin-product/AdminProduct'
export const AdminProductList = (props) => {
//to access the state
 const ProductCtx=useContext(ProductContext)

 useEffect(()=>{
  getProducts();
 },[ProductCtx.products])

  const getProducts= async ()=>{
   const data= await fetch("http://localhost:999/product/productlist");
   const product_data=await data.json();
    
   ProductCtx.setProducts (product_data.products);
  }

  return (
    <div>
         <h2>Product List in Admin</h2>
        

      {ProductCtx.products.map((product,index)=>
        <AdminProduct key={index} product_id={product._id} pname={product.product_name} 
        pimage={product.product_image}
         price={product.product_price}
          description={product.product_description}/>
      )}
    </div>
  )
}

