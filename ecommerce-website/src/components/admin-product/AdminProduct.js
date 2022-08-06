import React,{useContext} from 'react';
import './admin-product.css';
import CartContext from '../../store/CartContext';
import {useNavigate} from 'react-router-dom';
import {Update} from '../updateproduct/Update';

export const AdminProduct=(props)=>{
    console.log(props)
    const navigate=useNavigate();
    console.log(props.product_id);

    //const CartCtx=useContext(CartContext);
    const updateHandler=(event)=>{
        navigate('/update',{state:{product:props}})
    }
    
    return(
        <div>
            <div className='product_container'>
                <div className='product_title'>{props.pname}</div>
                <div className='product_image'>
                    <img src={props.pimage}/>
                </div>
                <div className='product_price'>{props.price}</div>
                <div className='product_description'>{props.description}</div>
                
                <div className='button_container'>
                    <button className='edit' onClick={updateHandler}>Edit </button>
                </div>
                <div className='button_container'>
                    <button className='del' >Delete</button>
                </div>

            </div>
        </div>
    )
    
}

