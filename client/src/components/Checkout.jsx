

import { useContext, useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import AppContext from "../context/AppContext";
 import {useNavigate} from "react-router-dom";

import axios from "axios"
const Checkout = () => {

      const navigate= useNavigate()  

        

 const {userAddress , userCart , userProfile ,addToCart, decreaseQty ,RemoveFromCart , URL  ,  ClearCart , getUserOrder }=  useContext(AppContext)

      //  console.log("usercart hhhh", userCart)
      

   const[qty, setQty]=  useState(0)
   const[price, setPrice]=  useState(0)

    useEffect(()=>{

       let qty=0;
       let price=0
    for(let i=0;  i<userCart?.items.length; i++){

          qty+= userCart?.items[i].qty;
             price+=userCart?.items[i].price



    }
     setQty(qty)
       setPrice(price)


    },[userCart])

 

    const handlePaymentButton = async()=>{
        try {
                          
        
     const orderResponse= await axios.post(`${URL}/payment/checkout`,
   {
          amount:price,
           qty:qty,
          cartItem :userCart?.items,
          userShipping :userAddress, 
           userId :userProfile?._id
       
         },
  {
    headers: {
      "Content-Type":"application/json",
      Auth: localStorage.getItem("token")
    }
  }
);
        
   const{ orderId, amount:orderAmount} = orderResponse.data; 
     console.log( "impotr",import.meta.env)
    const options = {
        key:  import.meta.env.VITE_RAZORPAY_KEY_ID,
          // key: 'rzp_test_SBX1X8Jv1Tnb9h', // Replace with your Razorpay key_id
        amount:  orderAmount*100, // Amount is in currency subunits.
        currency: 'INR',
        name: 'kishan kumar sahu',
        description: 'Test Transaction',
        order_id:  orderId, // This is the order_id created in the backend


         handler: async function(response){
    
         const paymentData={
          orderId: response.razorpay_order_id ,
          paymentId:  response.razorpay_payment_id ,
          signature: response.razorpay_signature ,
           amount: orderAmount,

           orderItems: userCart?.items,
           userId:userProfile._id,
           userShipping: userAddress

         }




   const api= await axios.post(`${URL}/payment/very-payment`, paymentData)

         // order wala  case hai  // create order hai 
    const api2 = await axios.post(`${URL}/order/createorder` ,paymentData )


   if(api.data.success){  // api.data.success true hoga  to hi  ye chlega 


   ClearCart ()



const handlePaymentSuccess = async () => {
  await getUserOrder();     // 🔥 latest order lao
  navigate("/orderconfirmation");
};

   handlePaymentSuccess()

         
             }


     
   
         },

      
        prefill: {
          name: 'kishan kumar sahu ',
          email: 'kk3424052@gmail.com',
          contact: '8409660865'
        },
        theme: {
          color: '#F37254'
        },
      };



      const rzp = new window.Razorpay(options);
          rzp.open();

      console.log("orderResponse:", orderResponse)

          
        } catch (error) {
           console.log(error) 
        }

    }




  

  return (
    <div className="container-fluid bg-light py-4 min-vh-100">
      <div className="container">

        <h3 className="fw-bold mb-4  text-black">Checkout</h3>

        <div className="row g-4">

          {/* LEFT SIDE */}
          <div className="col-lg-8">

            {/* Delivery Address */}
          {
            
            
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold mb-0">Delivery Address</h5>
                  <button
                     onClick={()=> navigate("/edit/address")}
                  className="btn btn-outline-primary btn-sm">
                    Change
                  </button>
                </div>

                <div className="border rounded p-3">
                  <p className="fw-semibold mb-1"> Name: {userAddress?.fullName}</p>
                   <p className="small  mb-1   ">
                       Address: {userAddress?.address}
                  </p>
                   <p className="small  mb-1">
                       country: {userAddress?.country}
                  </p>
                   <p className="small  mb-1">
                      state: {userAddress?.state}
                  </p>
                   <p className="small  mb-1">
                      city: {userAddress?.city}
                  </p>
                 
                  <p className="small  mb-1">Pincode: {userAddress?.pincode}</p>
                  <p className="small  mb-0">
                    Mobile: {userAddress?.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
            
          }

            {/* Cart Items */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">Your Items</h5>

                {/* PRODUCT CARD */}
                

              { userCart?.items.map((product)=><div className="border rounded p-3">
                  <div className="row align-items-center">
                    <div className="col-3 col-md-2">
                      <img
                        src={product?.imgSrc}
                        alt="product"
                        className="img-fluid rounded"
                      />
                    </div>

                    <div className="col-9 col-md-6">
                      <h6 className="mb-1">{product?.title}</h6>
                      <p className="small text-muted mb-1">
                        {product.description}
                      </p>
                      {/* ₹ */}
                      <p className="fw-semibold mb-0">Price : {product?.price}</p>
                       <p className="fw-semibold mb-0">Quantaty : {product?.qty}</p>
                    </div>

 

                    <div className="col-md-4 d-flex justify-content-end align-items-center gap-2 mt-3 mt-md-0">
                      <button
                             onClick={()=>decreaseQty(product?.productId, 1)}
                      className="btn btn-outline-secondary btn-sm">
                        -
                      </button>
                      <span className="fw-semibold"></span>
                      <button 
                         
                          onClick={()=> addToCart(product?.productId, product?.title, product?.price/product?.qty, 1,product?.imgSrc) }
                      
                      className="btn btn-outline-secondary btn-sm">
                        +
                      </button>
                      <button
                           onClick={()=>RemoveFromCart(product?.productId )}
                      className=" btn  btn-outline-danger  d-flex align-items-center" style={{fontSize:"22px"}}>
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </div>
                </div>
)}





              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">Order Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹ {price}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery</span>
                  <span className="text-success">FREE</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>Total</span>
                  <span>₹ {price}</span>
                </div>

                <button 
                 onClick={handlePaymentButton}
                className="btn btn-primary w-100 py-2">
                  Proceed to pay
                </button>

                <p className="small  text-center mt-2">
                  🔒 Secure & Encrypted Payments
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
