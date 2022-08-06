 const express=require('express');
 const bcrypt=require('bcryptjs');
 const {User}=require('../models/User');
 const jwt=require('jsonwebtoken');
 const router=express.Router();
 
 router.post('/add',async(req,res)=>{
   try{
    let {full_name,email,password}=req.body;
    //generate password hash
    const salt=await bcrypt.genSalt(10);// 1st creating salt
    password=await bcrypt.hash(password,salt)

    const user=new User({full_name,email,password});

    await user.save();
    return res.status(200).json({
      message:"user saved successfully",
      user
    })
   }catch(err){
      return res.status(500).json({
          message : "Something went wrong",
          //error : err.message
      })
  }
   

 })  

 router.post('/login',async(req,res)=>{
   try{
      const {email,password}=req.body;
      console.log(email,password);
      const user= await User.findOne({email:email});//i.e fatch by the user email/other then id
      if(user){//if got the user
         const verifyuser=await bcrypt.compare(password,user.password);//then compare the pw
         if(verifyuser){
            const payload={
               user:{
                  id:user._id
                  //name:user.full_name
               }
            }
            const token=jwt.sign(payload,'siliconMERNCourse',{expiresIn:36000})
            res.status(200).json({
               message:"logged in",    
              user:{user_id:user._id,email:user.email},
              token
         })
         }else{
         res.status(401).json({
            message:"wrong password/username" 
         })   

          }  
   }else{
      res.status(401).json({
         message:"wrong password/username" 
      })   

       }  

 
   }catch(err){
      res.status(401).json({
         message:"something wend wrong" 
      }) 
   }
 })

 module.exports=router ;