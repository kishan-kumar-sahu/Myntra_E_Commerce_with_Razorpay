// import express from "express";

// import { getSingleOrder , updateOrderStatus  , createOrder, cancelOrderByUser, UserAllOrder } from "../Controllers/order.js";
//  import { getAllOrders  } from "../Controllers/order.js";
// import { Authenticated } from "../Middlewares/auth.js";

//  import { adminAuth } from "../Middlewares/adminAuth.js";
// const router = express.Router();

//   // get AllOrder

//     //  ye bnega /api/order/allorder
//     // update status (admin / system)


//     //   get all order of user
//         // /api/order/alluserorder  
//     router.get("/alluserorder",  Authenticated,UserAllOrder )
        
    
//   // router.get("/allorder",     adminAuth,  getAllOrders);    
 
//   router.get("/allorder", getAllOrders);  

// router.post("/createorder" ,    createOrder)


// // update status (admin / system)
// router.put("/update-status/:orderId",  adminAuth,  updateOrderStatus );


// // track order
// router.get("/:orderId",   getSingleOrder);







//  // cancel order by user

// //  /api/order/cancel/orderid

//  router.put("/cancel/:orderId", cancelOrderByUser)






// export default router;










////



import express from "express";

import { getSingleOrder , updateOrderStatus  , createOrder, cancelOrderByUser, UserAllOrder , getSingleOrderAdmin } from "../Controllers/order.js";
 import { getAllOrders  } from "../Controllers/order.js";
import { Authenticated } from "../Middlewares/auth.js";

 import { adminAuth } from "../Middlewares/adminAuth.js";
const router = express.Router();

  // get AllOrder

    //  ye bnega /api/order/allorder
    // update status (admin / system)


    //   get all order of user
        // /api/order/alluserorder  
    router.get("/alluserorder",  Authenticated,UserAllOrder )
        
    
  // router.get("/allorder",     adminAuth,  getAllOrders);    
      
  router.get("/allorder",      Authenticated,adminAuth,   getAllOrders);  

router.post("/createorder" ,   createOrder)




// update status (admin / system)
router.put("/update-status/:orderId",  Authenticated,adminAuth,  updateOrderStatus );


                   // track order
   router.get("/:orderId",  Authenticated,   getSingleOrder);







 // cancel order by user

//  /api/order/cancel/orderid

 router.put("/cancel/:orderId", cancelOrderByUser)


    //    abhi 
router.get("/admin/:orderId",  Authenticated, adminAuth, getSingleOrderAdmin);


export default router;

