import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

const OrderModal = (prop) => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('');

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => setShow(true);


    useEffect(() => {
        setAddress(prop.cartItems[0].order_address);
      }, [show]);

  const confirmPayment = (completed) => {
    if(completed) {
      for(var i = 0; i < prop.cartItems.length; i++) {
        prop.cartItems[i].order_address = address;
        axios.put(process.env.serverUrl+'/order/placeorder/'+prop.cartItems[i]._id, prop.cartItems[i])
        .then((res) => {})
        .catch((err) => console.error(err));
      }
      Swal.fire(
      'Done',
      'Order Placed Sucessfully!',
      'success'
      )
      prop.rerender(!prop.render);
    }
    else {
      Swal.fire({icon: 'error', title: "Payment Failed!"})
    }
  }



  return (
    <>
      <button title="Buy Now"  onClick={handleShow} className='btn btn-block btn-dark'>
        BUY NOW
      </button>

      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            prop.cartItems.map((order, index) => (
              <div>
                <label>{index+1 +"."}</label>
                <label style={{marginLeft: "2px", marginRight: "10px"}}>{order.product_name}</label>
                <label><b>{order.order_price}</b></label>
              </div>
            ))
          }
          <div>
            <label><b>{"Sub Total =  ₹" + prop.total}</b></label>
          </div>
          <div>
            <label>Address : </label> <br/>
            <input type='text' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} className='form-control'/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-success' onClick={() => confirmPayment(true)}>Proceed to Pay</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default OrderModal