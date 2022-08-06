import React ,{useContext,useState} from 'react';
import './register-admin.css'; 
import axios from "axios" ;  

const RegisterAdmin=(props)=>{
    
    
    const [formInput,setFormInput]=useState({
        full_name:'',
        email:'',
        password:''
        

    })
    const full_nameHandler=(event)=>{
       
        setFormInput((prevState)=>{
            return{
                ...prevState,
                full_name:event.target.value
            }
        })
        }
    const emailHandler=(event)=>{
       
    setFormInput((prevState)=>{
        return{
            ...prevState,
            email:event.target.value
        }
    })
    }
    const passwordHandler=(event)=>{
        
        setFormInput((prevState)=>{
            return{
                ...prevState,
                password:event.target.value
            }
        })
    }
   
    
   
   
    const formSubmitHandler=(event)=>{
        let error=''
        if(formInput.full_name=='' && error==''){
            error='Please enter the name'
            console.log(error);
        }
        
        saveData(formInput) 
        
        event.preventDefault();

    }
    const saveData= async (formData)=>{
        const user={
        full_name:formData.full_name,
        email:formData.email,
        password:formData.password
        }
        const message=await axios.post("http://localhost:999/user/add",user,{
            headers:{
                'Content-Type':'application/json'
            }
        })

         
    }


    return(

        <div className='form-container'>

        <h1>Register Admin User</h1>
            <form onSubmit={formSubmitHandler}>
              
              <div className='form-input'>
                    <input type="text" placeholder='FullName' onChange={full_nameHandler}/>
                </div>
                <div className='form-input'>
                    <input type="text" placeholder='Email' onChange={emailHandler}/>
                </div>
                <div className='form-input'>
                    <input type="password" placeholder='Password' onChange={passwordHandler}/>
                </div>
                <div className='clearfix'></div>
                
                <div className='form-input'>
                    <button className="btn_add">Add User</button>
                </div>
                <div className='clearfix'></div>
            </form>
        </div>
    )
}

export default RegisterAdmin ;