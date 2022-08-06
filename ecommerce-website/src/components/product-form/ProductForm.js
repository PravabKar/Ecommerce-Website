import React ,{useContext,useState} from 'react';
import ProductContext from '../../store/ProductContext'
import './product-form.css'; 
import axios from "axios" ;  

const ProductForm=(props)=>{
    const ProductCtx=useContext(ProductContext);
    const [resmessage,setresMessage]=useState('');
    // const [productName,setProductName]=useState('')
    // const [productPrice,setProductPrice]=useState('')
    // const [productImage,setProductImage]=useState('')
    // const [productDescription,setProductDescription]=useState('')

    //or
    const [formInput,setFormInput]=useState({
        productName:'',
        productPrice:'',
        productImage:'',
        productDescription:''


    })
    const productNameHandler=(event)=>{
       // setProductName(event.target.value);
    setFormInput((prevState)=>{
        return{
            ...prevState,
            productName:event.target.value
        }
    })
    }
    const productPriceHandler=(event)=>{
        //setProductPrice(event.target.value);
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productPrice:event.target.value
            }
        })
    }
    const productImageHandler=(event)=>{
        //setProductImage(event.target.value);
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productImage:event.target.value
            }
        })

    }
    const productDescriptionHandler=(event)=>{
        //setProductDescription(event.target.value);
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productDescription:event.target.value
            }
        })


    }
    
   
    const formSubmitHandler=async (event)=>{

        let error=''
        if(formInput.productName=='' && error==''){
          error='Please enter product name';
          setresMessage(error);
        }
        if(error=='')
           saveProductData(formInput);

        event.preventDefault();
    
    }
        

        const saveProductData= async (formData)=>{
            try{
            

            const product={
            product_name:formData.productName,
            product_price:formData.productPrice,
            product_image:formData.productImage,
            product_description:formData.productDescription
            }
            const result=await axios.post("http://localhost:999/product/add",product,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log(result.data.message);
            setresMessage('');
            ProductCtx.setProducts([...ProductCtx.products,product])
        }catch(err){
            console.log('from Error',err.message);

        }
    
             
        }

    
    return(

        <div className='form-container'>

        <h1>Add Product</h1>
            <form onSubmit={formSubmitHandler}>
              <div>{resmessage}</div>
                <div className='form-input'>
                    <input type="text" placeholder='Product Name' onChange={productNameHandler}/>
                </div>
                <div className='form-input'>
                    <input type="text" placeholder='Product price' onChange={productPriceHandler}/>
                </div>
                <div className='clearfix'></div>
                <div className='form-input'>
                    <input type="text" placeholder='Product image' onChange={productImageHandler}/>
                </div>
                <div className='form-input'>
                    <input type="text" placeholder='Product Description' onChange={productDescriptionHandler}/>
                </div>
                <div className='clearfix'></div>
                <div className='form-input'>
                    <button className="btn_add_product">Add Product</button>
                </div>
                <div className='clearfix'></div>
            </form>
        </div>
    )
}

export default ProductForm;