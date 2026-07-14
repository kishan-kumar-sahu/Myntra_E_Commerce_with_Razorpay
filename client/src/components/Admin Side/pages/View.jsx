import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const View =  () => {

 const navigate = useNavigate()

 const {orderId}=useParams()

  const{ getsingleOrder , order}= useContext(AppContext)


 console.log("current  hai bhi kisahna ", order)



//   getsingleOrder(orderId)

      useEffect(() => {
    if(orderId){
      getsingleOrder(orderId)
    }
  }, [orderId])

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-10 col-md-12">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold mb-1  text-black">Order Overview</h4>
              <p className="text-muted mb-0">
                Complete order information & status
              </p>
            </div>

            <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill">
              {order?.orderStatus}
            </span>
          </div>

          {/* Order Summary */}
       <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">

              <div className="row text-center text-md-start">
                <div className="col-md-4 mb-3">
                  <p className="text-muted mb-1">Order ID</p>
                  <h6 className="fw-bold">{order?.order?.orderId}</h6>
                </div>

                <div className="col-md-4 mb-3">
                  <p className="text-muted mb-1">Order Date</p>
           <h6 className="fw-bold">
 {new Date(order?.order?.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}</h6>
                </div>

                <div className="col-md-4 mb-3">
                  <p className="text-muted mb-1">Payment</p>
                  <h6 className="fw-bold text-success">{order?.order?.payStatus}</h6>
                </div>
              </div>

            </div>
          </div>

          {/* Customer + Address */}
       <div className="row g-4 mb-4">

            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3">Customer Details</h6>

                  <p className="mb-1">
                    <strong>Name:</strong> {order?.order?.userShipping?.fullName}
                  </p>
                  {/* <p className="mb-1">
                    <strong>Email:</strong> {order?.userShipping?.fullName}
                  </p> */}
                  <p className="mb-0">
                    <strong>Phone:</strong>{order?.order?.userShipping?.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3">Shipping Address</h6>

               <p className="mb-0 fw-semibold text-muted"> Address: {order?.order?.userShipping?.address}</p>
               <p className="mb-0 fw-semibold text-muted"> State: {order?.order?.userShipping?.state}</p>
               <p className="mb-0 fw-semibold text-muted"> City: {order?.order?.userShipping?.city}</p>
               <p className="mb-0 fw-semibold text-muted">Country: {order?.order?.userShipping?.country}</p>
               <p className="mb-0 fw-semibold text-muted"> Pincode: {order?.order?.userShipping?.pincode}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Products */}
       

{ order?.order?.orderItems?.map((userItem, index) => (
    <div key={index} className="card shadow-sm border-0 rounded-4 mb-4">
      <div className="card-body p-4">
        <h6 className="fw-bold mb-3">Ordered Product</h6>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                 <th className="text-center">title</th>
                <th className="text-center">Price</th>
                <th className="text-center">Qty</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={userItem?.imgSrc}
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      className="rounded-3"
                      alt=""
                    />
                   
                  </div>
                </td>
                    <td className="text-center">{userItem?.title}</td>
                <td className="text-center">₹{userItem?.price}</td>
                <td className="text-center">{userItem?.qty}</td>
                <td className="text-end fw-semibold">
                  ₹{userItem?.price}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ))
}


          {/* Price Summary */}
          <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-end">
                <div style={{ minWidth: "280px" }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span>{order.amount}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Shipping</span>
                    <span className="text-success">Free</span>
                  </div>

                  <div className="d-flex justify-content-between border-top pt-3">
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-5 text-success">
                       {order?.order?.amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="d-flex justify-content-between flex-wrap gap-2">
            <button 
               onClick={()=> navigate("/admin/orders")}
            className="btn btn-outline-secondary px-4">
              ← Back
            </button>

            <button
             onClick={()=> navigate(`/adminStatusUpdate/${orderId}`)}
            className="btn btn-primary px-4 fw-semibold">
              Update Status
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default View;
