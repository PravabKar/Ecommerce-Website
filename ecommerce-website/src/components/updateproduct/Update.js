 
import { useLocation } from "react-router-dom"
import axios from 'axios';
import './update.css';
import { useState } from "react";
export const Update = () =>{
    const { state } = useLocation();
    const { product } = state;
    const id= product.product_id;
    // console.log(product);
    const [er,setEr] = useState('')
    const [formInput,setFormInput] = useState({
        productName:'',
        productPrice:'', 
        productImage:'',
        productDescription:''
    })
    const productNameHandler = (event) => {
        setFormInput({
            ...formInput,
            productName:event.target.value
        })
    }
    const productPriceHandler = (event) => {
        setFormInput({
            ...formInput,
            productPrice:event.target.value
        })
    }
    const productImageHandler = (event) => {
        setFormInput({
            ...formInput,
            productImage:event.target.value
        })
    }
    const productDescriptionHandler = (event) => {
        setFormInput({
            ...formInput,
            productDescription:event.target.value
        })
    }
    const[err,setErr]=useState({
        isError: false,
        message:''
    })
    const formSubmitHandler = async (event) => {
        event.preventDefault();
        
        if(formInput.productName == ''){
            setErr({
             isError: true,
             message:'Product name is required'
            })
        }
         else if(formInput.productPrice == ''){
             setErr({
                 isError: true,
                 message:'Product price is required'
             })
        }
        else{
            setErr({
                isError: false,
                message:''
            })
            await saveproductdata(formInput);
        }
       
    }
    const saveproductdata = async (formData) => {
        
        const produc = {
            product_name : formData.productName,
            product_description : formData.productDescription,
            product_price : formData.productPrice,
            product_image : formData.productImage
        }
        const message = await axios.put('http://localhost:999/product/update/'+id,produc,{
            header:{
                'Content-Type': 'application/json'
            }
        })
        .catch(error=>{
            setEr(error.response.data.message)
        });
    }
    return(
        <div className="update-form">
            <form onSubmit={formSubmitHandler}>
            { er !== '' &&
                    <div className="Danger">{er}</div>
                } 
                <div className="id">{product.product_id}</div>
                <div className="product-name">
                    <input type="text" placeholder={product.pname} className="name" onChange={productNameHandler}></input>
                </div>
                <div className="product-image">
                    <input type="text" placeholder={product.pimage} className="image" onChange={productImageHandler}></input>
                </div>
                <div className="product-price">
                    <input type="text" placeholder={product.price} className="price" onChange={productPriceHandler}></input>
                </div>
                <div className="product-description">
                    <input type="text" placeholder={product.description} className="description" onChange={productDescriptionHandler}></input>
                </div>
                <div className="product-button">
                    <button type="submit" className="submit">Update</button>
                </div>
            </form>
        </div>
               
    )
}
