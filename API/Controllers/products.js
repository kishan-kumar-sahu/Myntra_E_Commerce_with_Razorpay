

import {Products} from "../Models/Product.js"

import multer from "multer"





  // add product


//    export const addproduct =async(req,res)=>{





//   const { title ,description,price, category, qty, imgSrc,} = req.body;
   

//     try {

//         let product= await Products.create({
//             title ,
//             description,
//             price,
//              category, 
//              qty, 
//               imgSrc,
            
//             })

//             res.json({message:"product added successfully" , product, success: true})
        
//     } catch (error) {
      
//          res.json({message: error.message})
//     }
//    }







  



   export const addproductCloud =async(req,res)=>{

     

  const { title ,description,price, category, qty} = req.body;

    
    let   imgSrc= req.file.path;

      // console.log("imgSrc", imgSrc)
      

    
 
    try {

      
let product= await Products.create({
            title ,
            description,
            price,
             category, 
             qty, 
            imgSrc
            
            })

            res.json({message:"product added successfully" , product, success: true})
        
    } catch (error) {
            console.log("FULL ERROR =", error);
         res.status(500).json({message: error.message})
    }
   }





  

     // get products

     export const getProducts= async(req,res)=>{
    
          try {
            
         let products= await Products.find().sort({createdAt:-1})


            res.json({message: "All products", products})
          } catch (error) {
            

            res.json({ message: error.message})
          }


     }


     //  find product by id 

       export const getProductById=async(req,res)=>{

          const  id = req.params.id
     try {
       
     let product=  await Products.findById(id)
  
        if(!product){
             return  res.json({ message: "Invalid  Id !!"})

        }



     res.json({message: "specific product" , product})
     } catch (error) {
      
        
        res.json({message: error.message})
     }


       }


              //  update product by id 

        export const updateProductById=async(req,res)=>{

          const  id = req.params.id
            let  fullbody= req.body;  
     try {
       
     let updateProduct=  await Products.findByIdAndUpdate(id ,fullbody,{new: true} )
  
          if(!updateProduct){
             return  res.json({ message: "Invalid Id "})
          }

        res.json({message:"product has been updated !!" , updateProduct })  


     } catch (error) {
      
        
        res.json({message: error.message})
     }


       }



       //  delete product by id 
          export const deleteProductById=async(req,res)=>{

          const  id = req.params.id
        
     try {
       
     let deleteProduct=  await Products.findByIdAndDelete(id)
  
          if(!deleteProduct){
             return  res.json({ message: " does  not exist  Id "})
          }

        res.json({message:"product has been Delected !!" , deleteProduct })  


     } catch (error) {
      
        
        res.json({message: error.message})
     }


       }
