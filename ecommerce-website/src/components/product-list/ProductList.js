import React,{useContext,useEffect} from 'react'
import ProductContext from '../../store/ProductContext'
import {Product} from '../product/Product'
export const ProductList = (props) => {
//to access the state
 const ProductCtx=useContext(ProductContext)

 useEffect(()=>{
  getProducts();
 },[ProductCtx.products])

  const getProducts= async ()=>{
   const data= await fetch("http://localhost:999/product/productlist");
   const product_data=await data.json();
   //console.log(product_data); 
   ProductCtx.setProducts (product_data.products);
  }

  return (
    <div>
      {ProductCtx.products.map((product,index)=>
        <Product key={index} pname={product.product_name} 
        pimage={product.product_image}
         price={product.product_price}
          description={product.product_description}/>
      )}
    </div>
  )
}

