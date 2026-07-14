import mongoose from "mongoose"


   const userSchema=  new mongoose.Schema({

name:{
    type: String,
    require :true,

},

email:{
    type : String,
    require : true,
   unique: true
},
 password:{
    type: String,
    require: true,


 },

image:{
type:String,
  },

 role:{
   type:String,
   enum:["user", "admin"],
    default: "user"
 },

 wishlist:[
   {
 type: mongoose.Schema.Types.ObjectId,
   ref:"Products"  

 }],

  createdAt:{
     type: Date,
     default : Date.now
  }
 

     })


    
  export const User= mongoose.model("User", userSchema)

 