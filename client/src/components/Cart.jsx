


           import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";

const Cart = () => {

  const {
    userCart,
    decreaseQty,
    addToCart,
    RemoveFromCart,
    ClearCart
  } = useContext(AppContext);

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {

    let qty = 0;
    let price = 0;

    for (let i = 0; i < userCart?.items?.length; i++) {

      qty += userCart.items[i].qty;
      price += userCart.items[i].price;
    }

    setQty(qty);
    setPrice(price);

  }, [userCart]);

  return (
    <>

      <div
        className="cart-container"
        style={{
          maxWidth: "900px",
          margin: "20px auto",
          padding: "15px",
          background: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            color: "#333",
            fontWeight: "600",
            textAlign: "center"
          }}
        >
          Your Cart
        </h2>

        <h3 className="text-black text-center mb-4">
          Total Quantity: {qty}
        </h3>

        {
          userCart?.items.map((data) => (

            <div
              key={data?._id}
              className="cart-items"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
              }}
            >

              <div
                className="cart-item"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "15px",
                  background: "#fff",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}
              >

                {/* PRODUCT INFO */}
                <div
                  className="mb-3 mb-md-0"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    flex: "1",
                    minWidth: "250px"
                  }}
                >

                  <img
                    src={data.imgSrc}
                    alt="Product"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      objectFit: "cover"
                    }}
                  />

                  <div style={{ wordBreak: "break-word" }}>
                    <h6
                      style={{
                        margin: "0 0 5px 0",
                        fontWeight: "500",
                        color: "#111"
                      }}
                    >
                      {data.title}
                    </h6>

                    <p style={{ margin: "0", color: "#666" }}>
                      Price: {data?.price}
                    </p>

                    <p style={{ margin: "0", color: "#666" }}>
                      Quantity: {data?.qty}
                    </p>
                  </div>
                </div>

                {/* BUTTONS */}
                <div
                  className="cart-actions"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                    maxWidth: "120px"
                  }}
                >

                  <button
                    onClick={() =>
                      addToCart(
                        data?.productId,
                        data?.title,
                        data?.price / data?.qty,
                        1,
                        data?.imgSrc
                      )
                    }
                    style={{
                      padding: "8px 10px",
                      borderRadius: "5px",
                      border: "none",
                      background: "#3498db",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: "500"
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      decreaseQty(data?.productId, 1)
                    }
                    style={{
                      padding: "8px 10px",
                      borderRadius: "5px",
                      border: "none",
                      background: "#e74c3c",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: "500"
                    }}
                  >
                    -
                  </button>

                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure, want to remove from cart "
                        )
                      ) {
                        RemoveFromCart(data?.productId);
                      }
                    }}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      background: "#fff",
                      color: "#333",
                      cursor: "pointer",
                      fontWeight: "500"
                    }}
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))
        }

        {/* TOTAL */}
        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "600",
            color: "#111"
          }}
        >
          Total Amount: {price}
        </div>

        {/* BUTTONS */}
        {
          userCart?.items?.length > 0 && (

            <div
              className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3"
              style={{
                marginTop: "20px"
              }}
            >

              <Link
                to={"/address"}
                style={{
                  textDecoration: "none",
                  padding: "10px 25px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#1beb71",
                  color: "#fff",
                  fontWeight: "600",
                  textAlign: "center",
                  minWidth: "180px"
                }}
              >
                Checkout
              </Link>

              <button
                onClick={() => {

                  if (
                    confirm(
                      "Are you sure, do you want to clear cart"
                    )
                  ) {
                    ClearCart();
                  }
                }}
                className="bg-danger"
                style={{
                  minWidth: "180px",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "18px",
                  color: "#fff",
                  fontWeight: "600"
                }}
              >
                Clear Cart
              </button>

            </div>
          )
        }

      </div>

      {
        userCart?.items?.length == 0 && (

          <div className="d-flex justify-content-center">

            <Link
              to={"/"}
              className="fst-italic bg-info-subtle d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "8px",
                fontFamily: "ui-monospace",
                width: "250px",
                height: "45px",
                fontSize: "18px",
                textDecoration: "none",
                fontWeight: "bolder",
                color: "#000"
              }}
            >
              Continue Shopping...
            </Link>

          </div>
        )
      }

    </>
  );
};

export default Cart;