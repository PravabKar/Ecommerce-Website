
import React,{useContext,useEffect} from 'react'
 import { CartItem } from "../cart-item/CartItem";
import CartContext from '../../store/CartContext';
import './cart.css';
 export const Cart = () => {
    const CartCtx=useContext(CartContext) 
  return (
    <div className="container">
      <div className="cart-box mx-auto m-4">
         {/* <CartItem/>
        <CartItem/> */}
        {CartCtx.cartItems.map((item,index)=>
                <CartItem product_name={item.product_name} product_price={item.product_price} qty={item.qty} key={index}/>
                )}

      </div>
     </div>
   )
 }