import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Swal from 'sweetalert2';
import ProductAdd from '../components/productAdd';


const admin = () => {

  const [isSignedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

  },[])

  const submitHandler = (e) => {
    e.preventDefault();
    if(!email){
      alert("Please enter your email");
    }
    else if(!password){
      alert("Please enter your password");
    }
    else {
        if(email == 'pravab@admin.com' && password == 'admin123'){
            setSignedIn(true);
        }
        else {
            Swal.fire("Invalid Credentials!");
        }
    }

  }

  return (
    <div>
        {
            (isSignedIn) ? <ProductAdd /> :
        
                <div className="col d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>

                <div className="card card-primary  col-4  col d-flex justify-content-center">
                <div className="card-header card bg-primary ">
                    <h3 className="card-title text-white" >Admin Login</h3>
                </div>
                <form onSubmit={submitHandler}>
                <div className="card-body">
                    <div className='form-group'>
                        <label>Email</label> <br/>
                        <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control'/>
                    </div>
                    <div className='form-group'>
                        <label>Password</label> <br/>
                        <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control'/> 
                    </div>
                </div>
                <div className="card-footer ">
                    <button type='submit'className='btn btn-primary'>Submit</button>
                </div>
                </form>
                </div>

            </div>
        }
    </div>
  )
}

export default admin