import React,{useState,useContext,useEffect} from 'react'
import CartContext from '../../store/CartContext';
import AuthContext from '../../store/AuthContext'
import {Link,useNavigate} from 'react-router-dom';

import './navbar.css';
export const NavBar=()=>{
  const AuthCtx=useContext(AuthContext)
  const CartCtx=useContext((CartContext));
  const navigate=useNavigate();
  const[noofItems,setNoOfItems]=useState(0)

  useEffect(()=>{
    setNoOfItems(CartCtx.cartItems.length)
  },[CartCtx.cartItems])

  const onLogoutHandler=()=>{
    AuthCtx.setIsLoggedIn(false)
    navigate('/admin/login');
  }

    return(
<nav className="navbar navbar-expand-lg bg-black">
       <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src="https://www.logolynx.com/images/logolynx/ef/eff61be9c4acbaf64bb160e465636609.png"></img>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link  className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
        { !AuthCtx.isLoggedIn ?
         <Link className="nav-link" to="/admin/login">Login</Link> :
         <a className="nav-link" onClick={onLogoutHandler}>Logout</a>
        }
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/admin/register">
              Register 
            </Link>
          </li>
        
      </ul>
      <div className='p-4'>
        <div className='row'>
           <div className='col-md-8'>
             <Link to="/cart">
              Cart
             </Link>
            </div>
            <div className='col-md-4 fs-6 cart-box text-center'>
            {noofItems}
            </div>

        </div> 
      </div>
     
    </div>
       </div>
    </nav>
    )}