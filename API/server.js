
 import dotenv from "dotenv"

   dotenv.config()
 import express from "express"
 import cors from "cors"
  import mongoose from "mongoose"

   import "./Config/cloudinary.js"
   
 import bodyParser from "express"
  import userRouter from "./Routes/user.js"
 import productRouter from "./Routes/product.js"

 import CartRouter  from "./Routes/cart.js"

 import addressRouter from "./Routes/address.js"

 import paymentRouter from "./Routes/payment.js"

 import   OrderRouter  from "./Routes/order.js"
  
import wishlistRouter   from "./Routes/wishlist.js"
    
 import dns from "node:dns/promises";


const app = express();
  
const port=process.env.PORT

 const MONGO_URL=process.env.MONGO_DB_URL


  app.use(cors())

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

// app.use(bodyParser.json())        
   app.use(express.json())

   app.use("/uploads", express.static("uploads"));


    // mongoose.connect(MONGO_URL).then(()=>{
    //     console.log("mongodb is connected ")
         
    // }).catch((err)=>{

    //      console.log( "mongodb is not connected",err)
        
    // })

    
    const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

connectDB();


//     try {
//   const records = await dns.resolveSrv("_mongodb._tcp.cluster0.5ygpnyi.mongodb.net");
//   console.log(records);
// } catch (err) {
//   console.log(err);
// }


    app.get("/",(req,res)=>{
    res.json({message:" this is  a kishan "})
})


   app.use("/api/uploads", express.static("uploads"))

  // user Router
  app.use("/api/user", userRouter)

  


  
// product router
 app.use("/api/product" , productRouter)




 
 
//  cart router
app.use("/api/cart" , CartRouter)







// Address Router
app.use("/api/address", addressRouter )




   // for payment 
  app.use("/api/payment" , paymentRouter)


  //  order ka status ke liye 

  app.use("/api/order", OrderRouter );
  
 app.use("/api/wishlist", wishlistRouter)



   

app.listen(port,()=>{
    console.log(`server is stated port number:${port}`)
})

