import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";



const OrderConformation = () => {

   


    const navigate= useNavigate()
   const[latestOrders, setLatestOrders] = useState({})

    const{ userOrder }=useContext(AppContext)
   
      
       useEffect(() => {
       
       if(userOrder?.length){
       setLatestOrders(userOrder[0])

     
       }
        
       }, [userOrder])
       

    console.log("latestorder:", latestOrders)
// console.log("usercartppppp:", userCart)
          


  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: "650px", width: "100%" }}>
        <div className="card-body p-4 p-md-5">
          {/* Success Icon */}
          <div className="text-center mb-3">
            <div
              className="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center"
              style={{ width: "90px", height: "90px" }}
            >
              <span className="fs-1 text-success">✓</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center fw-bold mb-1">Order Confirmed</h2>
          <p className="text-center text-muted mb-4">
            Thank you for your purchase! Your order has been placed successfully.
          </p>

          {/* Order Details */}
           

         <div className="border rounded-3 p-3 mb-4 bg-light">
            <div className="row mb-2">
              <div className="col text-muted">Order ID</div>
              <div className="col text-end fw-semibold">{latestOrders.orderId}</div>
            </div>


              <div className="row mb-2">
             <div className="col text-muted">paymentId ID</div>
             <div className="col text-end fw-semibold">{latestOrders.paymentId}</div>
            </div>



            <div className="row mb-2">
     
              <div className="col text-muted">Payment Status</div>
              <div className="col text-end text-success fw-semibold">{latestOrders.payStatus}</div>
            </div>
            <div className="row">
              <div className="col text-muted">Delivery</div>
              <div className="col text-end fw-semibold">Expected in 3-5 days</div>
            </div>
          </div>

       
       




      {/* Product */}
       
       {latestOrders?.orderItems?.map((data)=>
               <div className="mb-3" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      <img  src={data.imgSrc}
               alt="Product"
              style={{ width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" }}
            />
            <div>
              <h6 style={{ margin: "0 0 5px 0", fontWeight: "500", color: "#111" }}>
                 {data.title}
              </h6>
              <p style={{ margin: "0", color: "#666" }}>Price: {data?.price}</p>
              <p style={{ margin: "0", color: "#666" }}>Quantity: {data?.qty} </p>
            </div>
          </div>
        )}








    
          {/* Total */}
          <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
            <span>Total Amount</span>
            <span>{latestOrders.amount}</span>
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2 d-md-flex">
            <button

            onClick={()=> navigate("/")}
            
            className="btn btn-outline-secondary w-100">
              Continue Shopping
            </button>
            <button 
             onClick={()=> navigate(`/trackorder/${latestOrders.orderId}`)}
            className="btn btn-success w-100">
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConformation;