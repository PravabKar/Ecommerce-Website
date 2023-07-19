import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const ProductAdd = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const categories = ["Laptops", "Phones", "Computer Accessories", "Books", "Furniture"];

    const submitHandler = (e) => {
        e.preventDefault();
        if(!name || !description || !image || !category || !rating || !price){
            Swal.fire("Please enter all fields!");
        }
        else {
            const Product = {name, description, category, rating, price, image};
            axios.post(process.env.serverUrl+"/products/add", Product)
                .then(
                    Swal.fire(
                        'Product Added!',
                        'Added Product',
                        'success'
                      )
                )
                .catch(err => console.log(err))
        }
    
    }


  return (
        <div className="col d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>

                <div className="card card-primary  col-4  col d-flex justify-content-center">
                <div className="card-header card bg-primary ">
                    <h3 className="card-title text-white" >Add Product</h3>
                </div>
                <form onSubmit={submitHandler}>
                <div className="card-body">
                    <div className='form-group'>
                        <label>Product Name</label> <br/>
                        <input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} className='form-control'/>
                    </div>
                    <div className='form-group'>
                        <label>Product Description</label> <br/>
                        <input type='text' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)} className='form-control'/>
                    </div>
                    <div className='form-group'>
                        <label>Product Category</label> <br/>
                        <select onChange={(e) => setCategory(e.target.value)} defaultValue='' className='form-select'>
                            <option disabled value=''>Select</option>
                            {categories.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Product Image Url</label> <br/>
                        <input type='text' placeholder='Image' value={image} onChange={(e)=>setImage(e.target.value)} className='form-control'/>
                    </div>
                    <div className='form-group'>
                        <label>Product Price</label> <br/>
                        <input type='number' placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} className='form-control'/>
                    </div>
                    <div className='form-group'>
                        <label>Product Rating</label> <br/>
                        <input type='number' placeholder='Rating out of 5' value={rating} onChange={(e)=>setRating(e.target.value)} className='form-control'/>
                    </div>
                </div>
                <div className="card-footer ">
                    <button type='submit'className='btn btn-primary'>Submit</button>
                </div>
                </form>
            </div>
        </div>
  )
}

export default ProductAdd