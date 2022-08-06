
const express=require('express');
const fs=require('fs');


const {Product}=require('../models/Product');

const Auth=require('../middlewares/Auth');
const router=express.Router();

//1-LIST
router.get('/productlist',async (req,res)=>{
    try{
   //accessing from db

 
    const products=await Product.find();
    return res.status(200).json({
        message:"products retrieved successfully",
        products
    })


    }catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err.message

        })
        
    }
}
)




//ADD OR CREATE
router.post("/add",async (req,res)=>{
    try{
        console.log(`reached the add route`);

          //accepting data from req body
        
        const { product_name,product_price,product_image,product_description} = req.body
        let error='';
        //validation of inputs
        if(product_name=='' && error == ''){
            error = "Missing product Name"
           return res.status(400).json({
                message: error
            })
        }
        if(product_price=='' && error == ''){
            error = "Missing product Price"
           return res.status(400).json({
                message: error
            })
        }
         const productObj={
            product_name:product_name,//or only product_name
            product_price:product_price,
            product_image:product_image,
            product_description:product_description
         }
        //instance of model

         const product=new Product(productObj);
         
        await product.save();
        res.status(200).json({
            message:"product saved successfully"
        })
        
    }catch(err){
        console.log(err.massage);
        res.status(500).json({
            message : "Something went wrong",
            error : err.message
        })
    }
})



//1-UPDATE BY ID
router.put("/update/:id",async (req,res)=>{
    try{
    const id=req.params.id;
    const {  product_name, product_price, product_image, product_description} = req.body


    //A-update by findByIdAndUpdate
    // await Product.findByIdAndUpdate(id,{ product_name,product_price,product_description,product_image})
    // return res.status(200).json({
    //     message:"product updated successfully"
    // }) 

    //(or)B-update by findById
    const product= await Product.findById(id);
    product.product_name=product_name;
    product.product_price=product_price;
    product.product_description=product_description;
    product.product_image=product_image;
    await product.save(); 
    return  res.status(200).json({ 
        message:"product updated successfully"
    })


    }catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err.message
        }) 
    }
})


//DELETE DAY12
router.delete("/delete/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ 
            message:"product deleted successfully"
        })
    }catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err.message
        }) 
    }
}) 




module.exports=router
