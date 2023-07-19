import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
const jwt = require('jsonwebtoken')


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    const submitHandler = (e) => {
      e.preventDefault();
      if(!email){
        alert("Please enter your email");
      }
      else if(!password){
        alert("Please enter your password");
      }
      else {

        const User = {email, password}
        

            axios.post(process.env.serverUrl+"/users/login", User)
              .then(
                res => {
                  
                  if(res.data.user){
                    localStorage.setItem('token', res.data.user)
                    alert("Login Sucessfull");
                    window.location.href = '/';
                  }else{
                    alert("Invalid Credentials");
                  }
                }
                )
                .catch(err => console.log(err))
      }

    }

  return (
        <div className="col d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>

          <div className="card card-primary  col-4  col d-flex justify-content-center">
          <div className="card-header card bg-primary ">
            <h3 className="card-title text-white" >Login</h3>
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
  )
}

export default Login