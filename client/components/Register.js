import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import Swal from 'sweetalert2';


const register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    function registerUser(e) {
      e.preventDefault();
      const user = {
        name, email, password, address
      }

      axios.post(process.env.serverUrl+'/users/register', user)
      .then(res => {
        console.log(res.data)
        if (res.data === 'User Added!') {
          Swal.fire('User Added');
          window.location.href = '/login';
        }
        else {
          Swal.fire('Failed to add user');
        }
      })
      .catch(err => console.log(err));

    }


  return (
    <div className='bg-light color-palette'>
    <div className="col d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div className="card card-primary  col-4  col d-flex justify-content-center">
    <div className="card-header card bg-primary ">
      <h3 className="card-title text-white" >Register</h3>
    </div>
    <form onSubmit={registerUser}>
    <div className="card-body">
        <div className='form-group'>
          <label>Name</label> <br/>
          <input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} className='form-control'/>
        </div>
        <div className='form-group'>
          <label>Email</label> <br/>
          <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control'/>
        </div>
        <div className='form-group'>
          <label>Password</label> <br/>
          <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control'/> 
        </div>
        <div className='form-group'>
          <label>Address</label> <br/>
          <input type='text' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} className='form-control'/>
        </div>
    </div>
    <div className="card-footer ">
        <button type='submit'className='btn btn-primary'>Submit</button>
    </div>
     </form>
  </div>

  </div>
  </div>
  )
}

export default register