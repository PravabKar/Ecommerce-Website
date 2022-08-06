import React ,{useContext,useState} from 'react';
//import ProductContext from '../../store/ProductContext'
import './Login.css'; 
import axios from "axios" ;
import { useNavigate } from 'react-router-dom'; 
import AuthContext from'../../../store/AuthContext'

const Login=(props)=>{
    const AuthCtx=useContext(AuthContext)
    const navigate=useNavigate();
    const [errmsg,setErrMsg]=useState('');
    // const ProductCtx=useContext(ProductContext);
    // const [resmessage,setresMessage]=useState('');
    
    const [user,setUser]=useState({
        email:'',
        password:''
        

    })
    const emailHandler=(event)=>{
       
        setUser((prevState)=>{
        return{
            ...prevState,
            email:event.target.value
        }
    })
    }
    const passwordHandler=(event)=>{
        
        setUser((prevState)=>{
            return{
                ...prevState,
                password:event.target.value
            }
        })
    }
   
    
   
    
    const loginHandler=async (event)=>{
        event.preventDefault();
        axios.post('http://localhost:999/user/login',user,{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(response=>{
            AuthCtx.setIsLoggedIn(true);
            navigate('/admin/product/add');
        })
        .catch(error=>{
            setErrMsg(error.response.data.message);
        })

    }
    
    return(

        <div className='form-container'>

        <h1>ADMIN LOGIN</h1>
            <form onSubmit={loginHandler}>
            {errmsg !=='' &&
            <div className='alert alert-danger'>{errmsg}</div>
            }
                <div className='form-input'>
                    <input type="text" placeholder='Email' onChange={emailHandler}/>
                </div>
                <div className='form-input'>
                    <input type="password" placeholder='Password' onChange={passwordHandler}/>
                </div>
                <div className='clearfix'></div>
                
                <div className='form-input'>
                    <button className="btn_login">Login</button>
                </div>
                <div className='clearfix'></div>
            </form>
        </div>
    )
}

export default Login;