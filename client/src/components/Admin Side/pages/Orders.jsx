import React, { useContext, useEffect } from "react";
import AppContext from "../../../context/AppContext";
 
import {useNavigate} from "react-router-dom"
  import AdminStatusUpdate from "./AdminStatusUpdate";
const Orders = () => {

   const navigate= useNavigate()
 const {orders,  getallOrders} = useContext(AppContext)

    // console.log( "kishan current", orders)

          useEffect(()=>{
            getallOrders()
          },[])

          
  return (
    <div className="container-fluid mt-4">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">All Orders</h4>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Amount (₹)</th>
                  <th>Payment ID</th>
                  <th>Payment</th>
                  <th>Order Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders?.map((order, index) => (
     
                  <tr key={order._id}>
                  
                    <td>{index + 1}</td>
                    <td>{order.orderId}</td>
                    <td className="text-muted">
                      {order.userId.slice(0, 8)}...
                    </td>
                    <td>{order.amount}</td>
                    <td className="text-muted">
                      {order.paymentId}
                    </td>

                    {/* Payment Status */}
                    <td>
                      <span
                        className={`badge ${
                          order?.payStatus === "paid"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {order.payStatus}
                      </span>
                    </td>

                    {/* Order Status */}
                    <td>
                      <span className="badge bg-info text-dark">
                        {order?.orderStatus}
                      </span>
                    </td>

                    <td>
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                         
                          onClick={()=>navigate(`/adminView/${order?.orderId}`)}
                      className="btn btn-sm btn-primary me-2">
                        View
                      </button>
                      <button
                       
                      
                      
                        onClick={()=>navigate(`/adminStatusUpdate/${order?.orderId}`)}
                      className="btn btn-sm btn-warning">
                        Update
                      </button>
                    </td>
                     
                  </tr>
               
                ))}

             
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
