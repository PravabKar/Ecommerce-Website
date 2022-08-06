const jwt= require('jsonwebtoken');

//building the Auth middleware 
const Auth=async(req,res,next)=>{
    try{
    //console.log(req.headers);
    //console.log(req.body);
    //next();

    //to get hold of the token
     const token=req.headers['x-auth-token'];

     if(!token){
        return res.status(400).json({
          message:"missing Auth token"
        })
     }
     //verification
     console.log(await jwt.verify(token,'siliconMERNCourse'));
     if(await jwt.verify(token,'siliconMERNCourse')){
        next();
    }else{
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
     

    }catch(err){
        res.status(500).json({
            message:"Unauthorized" 
        })
    }



    
} 
module.exports=Auth 
