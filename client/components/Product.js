import React, { useEffect } from 'react'
const jwt = require('jsonwebtoken')
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2';

const Product = (prop) => {

    const addtocart = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token')
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
            }else {
                axios.post(process.env.serverUrl+'/users/auth',  {},
                {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                    }
                }).then (res => {
                    // console.log(res.data);
                    const Order = {"user_id": res.data.user._id, "product_id": prop.product._id, "product_name": prop.product.name, "product_image": prop.product.image, "order_address": res.data.user.address, "order_price": prop.product.price};
                    // console.log(Order);
                    axios.post(process.env.serverUrl+'/order/addtocart', Order)
                    .then((res) => Swal.fire("Added to Cart!"))
                    .error((err) => console.log(err))
                }).catch (err => console.log(err));
            }
        }
    }

  return (
    <div style={{margin: "18px"}}>
        <Card style={{ width: '23rem', height: '37rem' }}>
            <Card.Img variant="top" src={prop.product.image} style={{maxHeight: "20rem"}}/>
            <Card.Body>
                <Card.Title>{prop.product.name}</Card.Title>
                <Card.Text>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Rating
                            name="simple-controlled"
                            value={prop.product.rating}
                            precision={0.1}
                            readOnly
                        /> 
                        <label style={{fontWeight: "bold"}}>₹ {prop.product.price} </label>
                    </div>
                    <br/>
                    <label style={{maxHeight: "100%"}}>
                        {prop.product.description}
                    </label>
                </Card.Text>
            </Card.Body>
            <Card.Footer className='justify-content-center'>
                <Button variant="dark" onClick={addtocart}>Add To Cart</Button>
            </Card.Footer>
        </Card>
    </div>
  )
}

export default Product