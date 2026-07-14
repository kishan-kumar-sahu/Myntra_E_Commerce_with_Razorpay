



import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import axios from "axios";
  import {  useNavigate } from "react-router-dom";

const MyOrder = () => {

  const { orderId } = useParams();
 
    const navigate= useNavigate();

  const { UserAllOrder, alluserOrder, URL } = useContext(AppContext);

  const [latestOrders, setLatestOrders] = useState({ orderItems: [] });

            useEffect(() => {
      if(orderId){
         UserAllOrder();
      }
   
      
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${URL}/order/${orderId}`, {
        headers: {
          Auth: localStorage.getItem("token"),
        },
      });

      setLatestOrders(res.data);
    } catch (error) {

      // console.log(error);
  
      navigate("/myorder");
      
    }
  };

   



 useEffect(() => {
  if (orderId === "undefined") {
    navigate("/myorder");
  }
}, [orderId]);

    useEffect(() => {
  if (orderId) {
    fetchOrder();
  }
}, [orderId]); 




  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="container-fluid py-4 px-2 px-md-4">

        <h3 className="fw-bold mb-4 text-black">My Orders</h3>

        {/* Order Card */}
        <div className="card shadow-sm border-0 rounded-4 mb-4">
          <div className="card-body p-3 p-md-4">

            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
              <div>
                <p className="mb-1 text-muted small">Order ID</p>
                <p className="fw-semibold mb-0">{latestOrders.orderId}</p>
              </div>

              <span className="badge bg-primary rounded-pill px-3 py-2 mt-2 mt-md-0">
                {latestOrders.orderStatus}
              </span>
            </div>

            <hr />

            {/* Products */}
            {latestOrders?.orderItems?.map((product) => (
              <div
                key={product._id}
                className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-3"
              >
                <img
                  src={product.imgSrc}
                  alt="product"
                  className="mb-2 mb-sm-0"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />

                <div className="ms-0 ms-sm-3 flex-grow-1">
                  <p className="fw-semibold mb-1">Title: {product.title}</p>
                  <p className="small text-muted mb-0">
                    Quantity: {product.qty}
                  </p>
                  <p className="fw-bold mb-0">
                    Price: {product.price}
                  </p>
                </div>
              </div>
            ))}

            <hr />

            {/* Footer */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
              <div>
                <p className="small text-muted mb-1">Total Amount</p>
                <p className="fw-bold mb-0">₹{latestOrders.amount}</p>
              </div>

              <div className="d-flex gap-2 flex-wrap">
                {latestOrders?.orderStatus !== "cancelled" && (
                  <Link
                    to={`/trackorder/${latestOrders.orderId}`}
                    className="btn btn-outline-dark rounded-pill px-3 px-md-4"
                  >
                    Track Order
                  </Link>
                )}

                {latestOrders?.orderStatus !== "cancelled" && (
                  <Link
                    to={`/tracking/cancelOrder/${latestOrders.orderId}`}
                    className="btn btn-outline-dark rounded-pill px-3 px-md-4"
                  >
                    Cancel Order
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>

        <hr style={{ backgroundColor: "black", height: "4px", border: "none" }} />

        {/* Order History */}
        <div className="mt-4">

          <h4 className="fw-bold mb-4 text-black">Order History</h4>

          {alluserOrder && alluserOrder?.length > 0 ? (
            alluserOrder.map((order) => (
              <div key={order._id} className="card shadow-sm border-0 rounded-4 mb-4">
                <div className="card-body p-3 p-md-4">

                  {/* Header */}
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                    <div>
                      <p className="mb-1 text-muted small">Order ID</p>
                      <p className="fw-semibold mb-0">{order.orderId}</p>
                    </div>

                    <span className="badge bg-primary rounded-pill px-3 py-2 mt-2 mt-md-0">
                      {order.orderStatus}
                    </span>
                  </div>

                  <hr />

                  {/* Products */}
                  {order?.orderItems?.map((product) => (
                    <div
                      key={product._id}
                      className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-3"
                    >
                      <img
                        src={product?.imgSrc}
                        alt="product"
                        className="mb-2 mb-sm-0"
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />

                      <div className="ms-0 ms-sm-3 flex-grow-1">
                        <p className="fw-semibold mb-1">{product?.title}</p>
                        <p className="small text-muted mb-0">
                          Qty: {product?.qty}
                        </p>
                        <p className="fw-bold mb-0">
                          price ₹ {product?.price}
                        </p>
                      </div>
                    </div>
                  ))}

                  <hr />

                  {/* Footer */}
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                    <div>
                      <p className="small text-muted mb-1">Total Amount</p>
                      <p className="fw-bold mb-0">₹{order.amount}</p>
                    </div>

                    {order?.orderStatus !== "cancelled" && (
                      <Link
                        to={`/trackorder/${order.orderId}`}
                        className="btn btn-outline-dark rounded-pill px-3 px-md-4"
                      >
                        Track Order
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No orders found.</p>
          )}

        </div>

      </div>
    </div>
  );
};

export default MyOrder;