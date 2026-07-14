

import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";

const CancelMyOrder = () => {

  const { orderId } = useParams();
  const { cancelOrderByUser  , cancelOrder,} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
     cancelOrderByUser(orderId);
    }
  }, [orderId]);  //  sirf ek baar chalega

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card shadow-lg p-5 rounded-4 text-center" style={{ minWidth: "300px" }}>
        <h3 className="text-danger fw-bold mb-3">
          Your Order Has Been {cancelOrder?.order?.orderStatus}

        </h3>

        <p className="text-muted">
          We're sorry! Your order will not be processed.
        </p>

        <button
          onClick={() => navigate("/")}
          className="btn btn-primary mt-3"
          style={{ borderRadius: "12px", padding: "8px 20px" }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CancelMyOrder;
