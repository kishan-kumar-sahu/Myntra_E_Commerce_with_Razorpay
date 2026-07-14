import React, { useContext, useState } from "react";

  import AppContext from "../../../context/AppContext";
   
   import {  useNavigate, useParams } from "react-router-dom";

    
const AdminStatusUpdate = () => {

     const {orderId}= useParams()

    const navigate= useNavigate()
    const {updateStatusatoAdmin , getallOrders }  = useContext(AppContext)

    

    //  console.log("current  user order", orderId)
  const [status, setStatus] = useState("Placed");



  const handleUpdate = async(e) => {
        e.preventDefault()



    const success= await updateStatusatoAdmin(orderId , status)

          console.log("succeesss", success)
       if(success){
          navigate("/admin/orders")
       }

         
      await   getallOrders()

 
  };

  return (
    <div className="d-flex justify-content-center">
      <div
        className="d-flex flex-column flex-md-row align-items-center gap-2 p-2 rounded-3 shadow-sm bg-light"
        style={{ minWidth: "260px" }}
      >
        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-select form-select-sm fw-semibold"
          style={{ maxWidth: "150px", cursor: "pointer" }}
        >
          <option>Placed</option>
          <option>Packed</option>
          <option>Shipped</option>
          <option>Delivered</option>
          {/* <option>Cancelled</option> */}
        </select>

        {/* Button */}
        <button
          onClick={handleUpdate}
          className="btn btn-sm btn-primary px-3 fw-semibold"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AdminStatusUpdate;
