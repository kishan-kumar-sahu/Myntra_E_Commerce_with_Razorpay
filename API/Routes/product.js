

// import  express from "express"
// import { addproduct, deleteProductById, getProductById, getProducts, updateProductById } from "../Controllers/products.js";
// import { adminAuth } from "../Middlewares/adminAuth.js";
//  const router= express.Router();


//   //add product 
//  router.post("/add",addproduct ) // means => /api/product/add


//    // get all products

//    router.get("/all" ,  getProducts )   // means =>/api/product/all


//    // find product by id 
//    router.get("/:id" , getProductById)



//    //  updated product by id 
//      router.put("/:id" , updateProductById)




//    // delete product by id    
//    router.delete("/:id" , deleteProductById)




   
//  export default router;


///


import express from "express"
import { 
  // addproduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
  addproductCloud
} from "../Controllers/products.js"


import { adminAuth } from "../Middlewares/adminAuth.js"
import { Authenticated } from "../Middlewares/auth.js"
 import upload from "../Middlewares/multer.js"
const router = express.Router()


// add product (admin)

//  router.post("/add", Authenticated, adminAuth,   upload.single("imgSrc"), addproduct)

// 
 router.post("/add",    Authenticated, adminAuth,  upload.single("imgSrc"),addproductCloud)
 

// get all products (public)
router.get("/all", getProducts)


// find product by id (public)
router.get("/:id", getProductById)


// update product (admin)
router.put("/:id", Authenticated, adminAuth, updateProductById)


// delete product (admin)
router.delete("/:id", Authenticated, adminAuth, deleteProductById)


export default router