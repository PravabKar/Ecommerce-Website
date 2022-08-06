
const express=require('express');
const fs=require('fs');
const {uuid}=require('uuidv4');
//const {Product}=require('./Product');
const {Product}=require('./models/Product');


const router=express.Router()

//LIST
router.get('/productlist',(req,res)=>{
    try{
   //accessing from db
  // by then
     Product.find().then((result)=>{
        return res.status(200).json({
            message:"product retrieved successfully",
            result
        })
     }).catch((err)=>{ 
        return res.status(500).json({
            message:"something went wrong",
            error:err.message
        })
    })

    //by await

    }catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err.message

        })
        
    }
}
)




//ADD OR CREATE
router.post("/add",(req,res)=>{
    try{
        // const filearray = fs.readdirSync(__dirname);
        // let products = [];
        // let error = '';
        // if(filearray.includes('product.json'))
          //  products = JSON.parse(fs.readFileSync('product.json'));

          //accepting data from req body
        const { product_name,product_price,product_description,product_image} = req.body
        //validation of inputs
        if(product_name=='' && error == ''){
            error = "Missing product Name"
            res.status(400).json({
                message: error
            })
        }
        if(product_price=='' && error == ''){
            error = "Missing product Price"
            res.status(400).json({
                message: error
            })
        }
         const productObj={
            product_name:product_name,//or only product_name
            product_price:product_price,
            product_description:product_description,
            product_image:product_image
         }
        //instance of model

         const product=new Product(productObj);
         product.save().then((result)=>
         {
            return res.status(200).json({
                message:"data saved successfully",
                result
            })
         })
         .catch((err)=>{
            return res.status(500).json({
                message:"something went wrong",
                error:err.message
            })
         })
          



        //const product = new Product(uuid(),product_name,product_price,product_description,product_image);
       // products = [...products,product ];

        // fs.writeFile('product.json', JSON.stringify(products),(err)=>{
        //     if(err) 
        //     res.status(500).json({
        //         message : "Something wrong while writing file",
        //         error : err
        //     })
        //     res.status(200).json({
        //         message : "product saved successfully",
        //         product
        //     })
        // })
    }catch(err){
        res.status(500).json({
            message : "Something went wrong",
            error : err.message
        })
    }
})

//DELETE day10
router.delete('/delete/:id',(req,res)=>
 {

    
    const {id}=req.params;
    let productarray=JSON.parse(fs.readFileSync('product.json'));
    productarray=productarray.filter(prod=>prod.id!=id);
    fs.writeFile('product.json',JSON.stringify(productarray),(err)=>{
        if(err)
        return res.status(500).json({
            message:"something went wrong",
            error:err
        })
        return res.status(200).json({
           message:"product deleted successfully" 
        })
    })
 })

//  //UPDATE day 10
//  router.put("/update/:id",(req,res)=>{
//     const {id}=req.params;
//     const {product_name,product_price,product_description,product_image}=req.body;
//     let productarray=JSON.parse(fs.readFileSync('product.json'));
//     productarray=productarray.filter(prod=>prod.id!=id);

//     const product = new Product(uuid(),product_name,product_price,product_description,product_image);
//     productarray=[...productarray,product];
//     fs.writeFile('product.json',JSON.stringify(productarray),(err)=>{
//         if(err)
//         return res.status(500).json({
//             message:"something went wrong",
//             error:err
//         })
//         return res.status(200).json({
//            message:"product updated successfully" 
//         })
//     })


//  })

//UPDATE DAY 12
router.put("/update/:id",async)


// another list / get here by name (day12)

//DELETE DAY12




module.exports=router
