import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Rating from '@mui/material/Rating';

const Product = (prop) => {
  return (
    <div style={{margin: "20px"}}>
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
                    {prop.product.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className='justify-content-center'>
                <Button variant="dark">Add To Cart</Button>
            </Card.Footer>
        </Card>
    </div>
  )
}

export default Product