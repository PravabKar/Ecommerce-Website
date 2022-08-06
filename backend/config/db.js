const mongoose=require('mongoose');


exports.dbConn=async ()=>{
    try{
    
    const dbURL="mongodb+srv://PRAVAB:cluster0password@cluster0.3htpk.mongodb.net/?retryWrites=true&w=majority";
     await mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true})
     console.log(`Database connected`);
    }catch(err){
        console.log(`Database connection error ${err.message}`);
    }
    }


    
    

