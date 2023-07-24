import axios from 'axios';
const jwt = require('jsonwebtoken')
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import NavbarTop from '../components/NavbarTop';
import { MdDelete } from "react-icons/md";
import OrderModal from '../components/OrderModal';


const cart = () => {

  const [isLoading, setLoading] = useState(true);
  const [user_id, setUserId] = useState('');
  const [user_name, setUserName] = useState('');
  const [cart_data, setCartData] = useState([]);
  const [render, setRender] = useState(true);
  const [total, setTotal] = useState(0);
   

  function printinconsole() {
    axios.post(process.env.serverUrl+'/users/auth',  {},
    {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then (res => {
      setUserId(res.data.user._id);
      setUserName(res.data.user.name);
      axios.get(process.env.serverUrl+'/order/cart/' +res.data.user._id)
      .then(res => {
        setCartData(res.data);
        var tot = 0;
        for (var i = 0; i < res.data.length; i++) {
          tot += res.data[i].order_price;
        }
        setTotal(tot);
      })
      .catch (err => console.log(err));
    }).catch (err => console.log(err));
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      const user = jwt.decode(token)
      if(!user){
        localStorage.removeItem('token')
      }else {
        printinconsole();
        setLoading(false);
      }
    }
    else {
      window.location.href = '/';
    }
  },[user_id, render])

  const removeFromCart = (id) => {
    axios.delete(process.env.serverUrl+'/order/removefromcart/'+id)
    .then((response) => setRender(!render))
    .catch((error) => console.log(error));
  }


  return (
    <div>
      { (isLoading) ? <div>Loading...</div> : <div>
        <NavbarTop hide={true}  name={user_name}/>
        <div style={{marginTop: "30px", marginLeft: "10%", marginRight: "10%"}}>
          <h1 style={{marginBottom: "25px"}}>Cart</h1>
          {
            (cart_data.length > 0) ? <div>
          <table className='table'>
            <thead>
              <tr className='table-dark'>
                <th style={{width: "5%"}}>Sl. No.</th>
                <th >Product</th>
                <th ></th>
                <th style={{width: "15%"}}>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                cart_data.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index+1}</td>
                    <td style={{width: "10%"}}>
                      <img src={order.product_image} style={{width: "70px", height: "70px"}}/>
                    </td>
                    <td>{order.product_name}</td>
                    <td>{"₹" + order.order_price}</td>
                    <td>
                      <button onClick={() =>removeFromCart(order._id)} className='btn btn-outline-danger' > <MdDelete /> </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          <div className='d-flex justify-content-between align-items-center'>
            <div>
                <label><b>Total Price : </b></label>
                <label style={{marginLeft: "5px"}}>{"₹" + total}</label>
            </div>
            <div>
              <OrderModal cartItems={cart_data} total={total} rerender={setRender} render={render}/>
            </div>
          </div>
          </div> : <div className='text-center'>Your Cart is Empty!</div>
          }
        </div>
      </div>
      }
    </div>
  )
}

export default cart