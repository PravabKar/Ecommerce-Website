import React from 'react'
import Product from './Product';

const ProductList = ({data}) => {
  return (
    <div style={{display: "flex", flexWrap: "wrap"}}>
        {
            data.length == 0 ? <div style={{minHeight: "35rem"}}>
                <label>No Products Available</label>
            </div> :
            data.map( (product, index) => (
                <Product product={product}/>
            ))
        }
    </div>
  )
}

export default ProductList