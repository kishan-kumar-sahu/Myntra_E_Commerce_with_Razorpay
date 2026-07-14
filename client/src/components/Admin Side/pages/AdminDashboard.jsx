

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";


const AdminDashboard = () => {


    
    const {orders,    products , user  ,    getallOrders,     getAllUsers}= useContext(AppContext)

 useEffect(() => {
       
   getallOrders();
       
    }, []);


     useEffect(()=>{
     getAllUsers()
    },[])
    

 const totalRevenue = orders?.reduce((total, order) => total + order.amount, 0);

  return (
    <div className="container-fluid p-0">
      <div className="row m-0">

        {/* Main Content Full Width */}
        <div className="col-12 p-4 bg-light">

          <h3 className="mb-4 fw-bold text-black">Dashboard Overview</h3>

          {/* Stats Cards */}
          <div className="row mb-4">

            <div className="col-md-3 mb-3">
              <div className="card shadow border-0 text-center p-3">
                <h6>Total Users</h6>
                <h4 className="fw-bold">{user?.length}</h4>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow border-0 text-center p-3">
                <h6>Total Products</h6>
                <h4 className="fw-bold">{products?.length}</h4>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow border-0 text-center p-3">
                <h6>Total Orders</h6>
                <h4 className="fw-bold">{orders.length}</h4>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow border-0 text-center p-3">
                <h6>Total Revenue</h6>
                <h4 className="fw-bold">{totalRevenue}</h4>
              </div>
            </div>

          </div>

          {/* Recent Orders Table */}
         {orders?.map((data)=> <div className="card shadow border-0">
            <div className="card-header bg-white fw-bold">
              Recent Orders
            </div>

            <div className="card-body p-0">
              <table className="table table-striped mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data?.orderId}</td>
                    <td>{data?.userShipping.fullName}</td>
                    <td>₹ {data?.amount}</td>
                    <td>
                      <span className="badge bg-warning text-dark">
                       {data?.orderStatus}
                      </span>
                    </td>
                    <td>{new Date(data.createdAt).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})}</td>
                  </tr>
                 
                
                </tbody>
              </table>
            </div>

          </div>)}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
