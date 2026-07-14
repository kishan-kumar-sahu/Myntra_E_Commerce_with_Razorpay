
import {Payment} from "../Models/Payment.js"


import Razorpay from "razorpay"

//  const razorpay=  new Razorpay({
   
//     key_id :"rzp_test_SBX1X8Jv1Tnb9h",
//      key_secret :"WKbOlTFx4Q5Q3ip4XU1n0X3W",
//  })

    const razorpay=  new Razorpay({
     
    key_id : process.env.KEY_ID,
     key_secret :process.env.KEY_SECRET,
 }) 



      // checkout 
 export  const checkout = async(req, res)=>{

    const {amount,cartItem,userShipping, userId } = req.body  

   const  options ={
      amount: amount*100,
     currency:"INR" ,
       receipt:`receipt_${Date.now()}`
   };

const order= await razorpay.orders.create(options)

  res.json({
    orderId: order.id ,
     amount: amount,
     cartItem,
     userShipping, 
     userId ,
   payStatus :"created"
  })

 }

         // verify and save to DB
 export const veryfy = async(req,res) =>{
   
 const {orderId, paymentId,  signature , amount,orderItems,userId ,userShipping } = req.body



 let orderConfirm=  await Payment.create({
orderId,
 paymentId,
   signature , 
   amount,
   orderItems,
   userId ,
   userShipping,
     payStatus :"paid"
    })


    res.json({
      message: "payment Successful...",
      success: true,
       orderConfirm
    })


 }


          // user specific Order
export const userOrder=async(req,res)=>{


         const userId = req.user. _id.toString();

          // console.log(userId. _id.toString())
    let  orders= await Payment.find({userId: userId}).sort({orderDate: -1})

       res.json(orders)
    
}


          // user AllOrder    and   // for admin
export const allOrders=async(req,res)=>{

 
let  orders= await Payment.find().sort({orderDate: -1})

       res.json(orders)
    
}

