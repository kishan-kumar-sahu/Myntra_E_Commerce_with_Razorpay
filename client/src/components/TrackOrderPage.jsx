

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/AppContext"

const TrackOrderPage = () => {

    const {URL}= useContext(AppContext)

  const { orderId } = useParams();
 
    

  const [order, setOrder] = useState(null);
 

  
  useEffect(() => {    // Page load pe ek baar call

    fetchOrder();
  }, [orderId , URL ]);

useEffect(() => {
  const interval = setInterval(() => {
    fetchOrder();
  }, 5000); // ⏱ 5 sec

  return () => clearInterval(interval);
}, [orderId, URL]);



    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${URL}/order/${orderId}`,{
          headers:{
            Auth: localStorage.getItem("token")
          }
        });

    //  console.log("order ka details track page wala   hubuhu  " ,res.data )
        setOrder(res.data);
      } catch (error) {
        console.log(error);
      } 
      
    };


  if (!order) {
    return <h4 className="text-center mt-5 text-danger">Order not found</h4>;
  }

  const steps = [
    { key: "placed", label: "Order Placed" },
    { key: "Packed", label: "Packed" },
    { key: "Shipped", label: "Shipped" },
    { key: "Delivered", label: "Delivered" }
  ];






  const activeIndex = steps.findIndex(
    step => step.key === order?.orderStatus
  );                                  


  // return (
  //   <div className="container py-5">
  //     <div className="card shadow-lg border-0 rounded-4 p-4">
  //       <h3 className="fw-bold mb-1">Track Your Order</h3>
  //       <p className="text-muted">Order ID: {order.orderId}</p>

  //       {/* Progress Bar */}
  //       <div className="progress mb-4" style={{ height: "10px" }}>
  //         <div
  //           className="progress-bar bg-success"
  //           style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
  //         />
  //       </div>

  //       {/* Steps */}
  //       <div className="row text-center">
  //         {steps.map((step, index) => (
  //           <div className="col" key={step.key}>
  //             <div
  //               className={`rounded-circle mx-auto mb-2 ${
  //                 index <= activeIndex ? "bg-success" : "bg-secondary"
                    
  //               }`}
  //               style={{ width: 40, height: 40 }}
  //             />
  //             <p
  //               className={`small fw-semibold ${
  //                 index <= activeIndex ? "text-success" : "text-muted"
  //               }`}
  //             >
  //               {step.label}
  //             </p>
  //           </div>
  //         ))}
  //       </div>

  //       {/* Order Summary */}
  //       <hr />
  //       <p><b>Payment:</b> {order?.payStatus}</p>
  //       <p><b>Total Amount:</b> ₹{order?.amount}</p>
  //       {/* <p><b>Delivery:</b> 3-5 working days</p> */}
  //     </div>
  //   </div>
  // );

  return (
  <div
    className="container py-5"
    style={{ minHeight: "100vh", background: "#f8f9fa" }}
  >
    <div
      className="card border-0 shadow-sm mx-auto"
      style={{ maxWidth: "900px", borderRadius: "20px" }}
    >
      {/* Header */}
      <div
        className="p-4 text-white"
        style={{
          background: "linear-gradient(135deg,#ff3f6c,#ff527b)",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <h2 className="fw-bold mb-1">Track Order</h2>
        <p className="mb-0 opacity-75">Order ID: {order.orderId}</p>
      </div>

      <div className="p-4">
        {/* Progress Bar */}
        <div className="position-relative mb-5">
          <div
            className="position-absolute top-50 start-0 w-100"
            style={{
              height: "6px",
              background: "#e9ecef",
              transform: "translateY(-50%)",
              borderRadius: "10px",
            }}
          />

          <div
            className="position-absolute top-50 start-0"
            style={{
              height: "6px",
              width: `${((activeIndex + 1) / steps.length) * 100}%`,
              background: "#03a685",
              transform: "translateY(-50%)",
              borderRadius: "10px",
              transition: "0.4s ease",
            }}
          />

          <div className="d-flex justify-content-between position-relative">
            {steps.map((step, index) => (
              <div
                key={step.key}
                className="text-center"
                style={{ width: "25%" }}
              >
                <div
                  className="mx-auto d-flex align-items-center justify-content-center fw-bold text-white"
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background:
                      index <= activeIndex ? "#03a685" : "#ced4da",
                    transition: "0.4s ease",
                    boxShadow:
                      index <= activeIndex
                        ? "0 4px 15px rgba(3,166,133,0.3)"
                        : "none",
                  }}
                >
                  {index + 1}
                </div>

                <p
                  className={`mt-2 small fw-semibold ${
                    index <= activeIndex
                      ? "text-success"
                      : "text-secondary"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status Card */}
        <div
          className="p-3 mb-4"
          style={{
            background: "#fff5f7",
            border: "1px solid #ffd6e1",
            borderRadius: "15px",
          }}
        >
          <h6 className="fw-bold mb-1">Current Status</h6>
          <span
            className="badge px-3 py-2"
            style={{
              background: "#ff3f6c",
              fontSize: "14px",
            }}
          >
            {order?.orderStatus}
          </span>
        </div>

        {/* Order Details */}
        <div className="row g-3">
          <div className="col-md-6">
            <div
              className="p-3 h-100"
              style={{
                background: "#f8f9fa",
                borderRadius: "15px",
              }}
            >
              <p className="mb-2">
                <strong>Payment Status</strong>
              </p>
              <h6
                className={
                  order?.payStatus === "Paid"
                    ? "text-success"
                    : "text-warning"
                }
              >
                {order?.payStatus}
              </h6>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="p-3 h-100"
              style={{
                background: "#f8f9fa",
                borderRadius: "15px",
              }}
            >
              <p className="mb-2">
                <strong>Total Amount</strong>
              </p>
              <h5 className="fw-bold text-dark">
                ₹{order?.amount}
              </h5>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <small className="text-muted">
            Your order is being processed and updated automatically every
            5 seconds.
          </small>
        </div>
      </div>
    </div>
  </div>
);
};

export default TrackOrderPage;
