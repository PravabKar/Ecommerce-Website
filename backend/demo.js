//ADD OR CREATE
//  app.post('/add',(req,res)=>{
//     try{
//         const filearray=fs.readdirSync(__dirname);
//         let products=[];
//         let error='';
//         if(filearray.includes('product.json'))
//            products=JSON.parse(fs.readFileSync('product.json'));//reading product.json
//         /*reading inputs for product object*/
//         const {product_name,product_price,product_description,product_image}=req.body;
//         //validation of inputs
//         if(product_name='' && error==''){
//             error="Missing product name"
//             res.status(400).json({
//                 message:error
//             })
//         }
//         if(product_price='' && error==''){
//             error="Missing product price"
//             res.status(400).json({
//                 message:error
//             })
//         }


//         //creating  product objects
//         const product=new Product(uuid(),product_name,product_price,product_description,product_image);
//         //adding it to existing products arry read from the product.json
//         products =[...products,product];
//         fs.writeFile('product.json',JSON.stringify(products),(err)=>
//         {
//             if(err)
//                  res.status(500).json({
//                     message:"something wrong in writing file",
//                     error:err
        
//                 })
            
//             res.status(200).json({
//                 message:"product saved successfully",
//                 product
//             })
            

//         })
//     }catch(err){
//         return res.status(500).json({
//             message:"something went wrong",
//             error:err.message

//         })


//     }
//  })


//w/o express.Router
//LIST
app.get('/productlist',(req,res)=>{
    try{
    console.log(__dirname);
    /*getting contents of directory*/   
    const filearray=fs.readdirSync(__dirname);
    console.log(filearray); 
    let products=[];
    let message='';
    //checking for the file product.json
    if(filearray.includes('product.json'))
        products=JSON.parse(fs.readFileSync('product.json'));

    if(products.length>0)
       message='product fatched successfully'
    else
        message='no product exists'

    return res.status(200).json({
        message:message,
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
app.post("/add",(req,res)=>{
    try{
        const filearray = fs.readdirSync(__dirname);
        let products = [];
        let error = '';
        if(filearray.includes('product.json'))
            products = JSON.parse(fs.readFileSync('product.json'));
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
        if(product_description=='' && error == ''){
            error = "Missing product description"
            res.status(400).json({
                message: error
            })
        }
        const product = new Product(uuid(),product_name,product_price,product_description,product_image);
        products = [...products,product ];

        fs.writeFile('product.json', JSON.stringify(products),(err)=>{
            if(err) 
            res.status(500).json({
                message : "Something wrong while writing file",
                error : err
            })
            res.status(200).json({
                message : "product saved successfully",
                product
            })
        })
    }catch(err){
        res.status(500).json({
            message : "Something went wrong",
            error : err.message
        })
    }
})