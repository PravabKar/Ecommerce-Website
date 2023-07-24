import axios from 'axios';
const jwt = require('jsonwebtoken')
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import NavbarTop from '../components/NavbarTop';


const order = () => {

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
      axios.get(process.env.serverUrl+'/order/history/' +res.data.user._id)
      .then(res => {
        console.log(res.data);
        const sortedOrders = res.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        setCartData(sortedOrders);
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

  function showDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return <label> {new Date(dateString).toLocaleTimeString()} <br/> {new Date(dateString).toLocaleDateString(undefined, options)} </label>
  }

  return (
    <div>
      { (isLoading) ? <div>Loading...</div> : <div>
        <NavbarTop hide={true}  name={user_name}/>
        <div style={{marginTop: "30px", marginLeft: "10%", marginRight: "10%"}}>
          <h1 style={{marginBottom: "25px"}}>Order History</h1>
          {
            (cart_data.length > 0) ? <div>
          <table className='table'>
            <thead>
              <tr className='table-dark'>
                <th >Product</th>
                <th ></th>
                <th style={{width: "15%"}}>Price</th>
                <th> Date & Time of Order</th>
              </tr>
            </thead>
            <tbody>
              {
                cart_data.map((order, index) => (
                  <tr key={order._id}>
                    <td style={{width: "10%"}}>
                      <img src={order.product_image} style={{width: "70px", height: "70px"}}/>
                    </td>
                    <td>{order.product_name}</td>
                    <td>{"₹" + order.order_price}</td>
                    <td>
                      {showDate(order.updatedAt)}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          </div> : <div className='text-center'>You Havent Ordered Anything Till Now.</div>
          }
        </div>
      </div>
      }
    </div>
  )
}

export default order