import jwt from "jsonwebtoken";

import { User } from "../Models/User.js";

 export const  Authenticated =async(req, res, next)=>{

const token = req.header("Auth");

   if( !token){
     return  res.json({ message: "Login first "})
   }
   
   
const  decoded = jwt.verify( token ,process.env.JWT_SECRET)
      

//  console.log( "hiiii",decoded)
  

const id= decoded.userId


   let user= await User.findById(id)   

     if(!user){
       return res.json({  message: "user does not exist"})
     }


   req.user= user;  // means user me req.user save  ho jaayega 
        // console.log(req.user)
   next();   // next ke baar addToCart wala chlega  matlab  ab ye chlega    next ke baat  addToCart
 }



