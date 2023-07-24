import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Login from '../components/Login'
import NavbarTop from '../components/NavbarTop'
import axios from 'axios'
const jwt = require('jsonwebtoken')


const login = () => {

  const [isLoading, setLoading] = useState(true);

  function printinconsole() {
    axios.post(process.env.serverUrl+'/users/auth',  {},
    {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then (res => {
      window.location.href = '/';
    }).catch (err => console.log(err));
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      const user = jwt.decode(token)
      if(!user){
        localStorage.removeItem('token')
        setLoading(false);
      }else {
        printinconsole();
      }
    } else {
      setLoading(false);
    }
  },[])

  return (
    <div>
      <NavbarTop hide={true}/>
      <Login />
    </div>
  )
}

export default login