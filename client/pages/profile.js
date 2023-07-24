import React, { useEffect, useState } from 'react'
const jwt = require('jsonwebtoken')
import axios, { all } from 'axios'
import NavbarTop from "../components/NavbarTop";
import Swal from 'sweetalert2';

const profile = () => {

  const [user_id, setUserId] = useState('');
  const [user_name, setUserName] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const setUserData = () => {
    axios.get(process.env.serverUrl+'/users/'+user_id)
    .then(response => {
      console.log(response);
      setName(response.data.name);
      setEmail(response.data.email);
      setAddress(response.data.address);
    })
    .catch(err => console.error(err));
  }

  function printinconsole() {
    axios.post(process.env.serverUrl+'/users/auth',  {},
    {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then (res => {
      setUserId(res.data.user._id);
      setUserName(res.data.user.name);
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
        setUserData();
      }
    }
    setLoading(false);
  },[user_id])

  function editUser(e) {
    e.preventDefault();
    const user = {
      name, email, address
    }

    axios.put(process.env.serverUrl+'/users/edituser/'+user_id, user)
    .then(res => {
      console.log(res.data)
      if (res.data === 'User Updated!') {
        Swal.fire('Done!', 'User Updated', 'success');
        window.location.href = '/';
      }
      else {
        Swal.fire('Failed to Update user');
      }
    })
    .catch(err => console.log(err));

  }

  return (
    <div>
      {
        (isLoading) ? <div>Loading...</div> :
        <div>
          <NavbarTop hide={true} name={user_name}/>

          <div className='bg-light color-palette'>
            <div className="col d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <div className="card card-primary  col-4  col d-flex justify-content-center">
            <div className="card-header card bg-primary ">
              <h3 className="card-title text-white" >Edit Profile</h3>
            </div>
            <form onSubmit={editUser}>
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

        </div>
      }


    </div>
  )
}

export default profile