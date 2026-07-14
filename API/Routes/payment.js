
  import express from "express"
  
  import {checkout}  from "../Controllers/payment.js"

  import { veryfy , userOrder , allOrders} from "../Controllers/payment.js" 
  

 import { Authenticated } from "../Middlewares/auth.js";
 import { adminAuth } from "../Middlewares/adminAuth.js";

const router= express.Router()

  

  


 router.post("/checkout" , Authenticated , checkout )


 router.post("/very-payment",   veryfy)

             // user specific order
   router.get("/userorder" , Authenticated ,  userOrder )



               //  All  orders    for  user login

   router.get("/orders" ,       allOrders )


  export default router;
