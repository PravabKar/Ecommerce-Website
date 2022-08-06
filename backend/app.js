const express=require('express');
//const mongoose=require('mongoose');not req here 

const productRoutes=require('./routes/product');
const userRoutes=require('./routes/user');
const {dbConn}=require('./config/db');
const fs=require('fs');
const {uuid}=require('uuidv4');
const {Product}=require('./Product');//to create product


const app=express();
const cors=require('cors');
 
const port=999;

app.use(express.json())//middlewares
app.use(cors());

app.use('/product',productRoutes);//
app.use('/user',userRoutes);//





dbConn();
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
}
)