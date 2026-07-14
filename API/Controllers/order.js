

import { Order } from "../Models/Order.js";




export const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

      const userId= req.user._id;

   const order = await Order.findOne({ orderId });
        
      //  console.log("order hai backend wala ",order)
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

       if (order.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  
   
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    
     
    const { status } = req.body; // packed / shipped / delivered

    const order = await Order.findOneAndUpdate(
      { orderId },
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const createOrder = async (req, res) => {
  try {
    const {
      orderId,
      userId,
      orderItems,
      amount,
      paymentId,
      userShipping
    } = req.body;

   
  

    if (!orderId || !userId || !orderItems || !amount) {
      return res.status(400).json({
        message: "Missing required order fields"
      });
    }

    const order = await Order.create({
      orderId,
      userId,
      orderItems,
      amount,
      paymentId,
      payStatus: "paid",
      orderStatus: "placed",
      userShipping
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });
  } catch (error) {
    console.log("CREATE ORDER ERROR", error);
    res.status(500).json({ message: error.message });
  }
};

            //    for admin side 
  export const getAllOrders = async (req, res) => {
  try {
    const  orders = await Order.find()
       
   
          if(!orders){
             return res.json({message:" order  not found"})
          }
    res.status(200).json({
      success: true,
       total: orders.length,
         orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



            // cancel order by user
        
 export const cancelOrderByUser=async(req,res)=>{

       const {orderId}= req.params;
  
            console.log(orderId)  
            
        const { status } = req.body;
 

        const order=await Order.findOneAndUpdate(
              {orderId},
            { orderStatus: status },
             { new: true }
        )
      

        if(!order){
   
         return res.json({message:"order does not exist!!",  success: false})
        }

       
        res.json({ message:"order is cancalled  successfully"  , order, success: true });

         


 }



 
       //  login  user's  allorder 
             
   export const  UserAllOrder= async(req,res)=>{
      
          const   userId= req.user;

              console.log("current  users order ", userId)
      try {

           const allOrderofUser= await Order.find( {userId}).sort({createdAt:-1})

           if(!allOrderofUser.length){
            return res.json({ message:"order does not exist", success: false})
           }
          
           res.json({message: "All Orders of User", allOrderofUser, success: true})   

          

      } catch (error) {
        
      res.json({message: error.message})
      }
   }




export const getSingleOrderAdmin = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({ message : " admin side Order View ", order, success: true});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};