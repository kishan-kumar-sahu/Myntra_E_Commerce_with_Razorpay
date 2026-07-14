

import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import AppContext from "../../context/AppContext";

function ShowProduct() {
  const navigate = useNavigate();
  const { products, addeishlist, addToCart, userAddress } = useContext(AppContext);

  const [likedProducts, setLikedProducts] = useState({});

  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <>
      {products?.length === 0 ? (
        <h1
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            color: "magenta",
            backgroundColor: "skyblue",
          }}
        >
           Loading...
        </h1>
      ) : (
        <div className="container py-4">
          <div className="row g-4 justify-content-center">
            {products?.map((product) => {
              const liked = likedProducts[product._id] || false;

              return (
                <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card bg-dark text-white text-center rounded-4 shadow-sm h-100">

                    {/* Product image */}
                    <div className="position-relative">

                      <Link
                        to={`/product/${product._id}`}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <img
                          src={product.imgSrc}
                          className="card-img-top rounded-4 p-2"
                          alt={product?.title}
                          style={{
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </Link>

                      {/* Wishlist icon */}
                      <div
                        className="position-absolute"
                        style={{
                          top: "10px",
                          right: "10px",
                          fontSize: "22px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          toggleLike(product._id);
                          addeishlist(product);
                        }}
                      >
                        {liked ? (
                          <FaHeart color="red" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{product?.title}</h5>

                      <div className="d-flex gap-2 justify-content-center mt-3 flex-wrap">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            const token = localStorage.getItem("token");

                            if (!token) {
                              return navigate("/login");
                            }

                            addToCart(
                              product?._id,
                              product?.title,
                              product?.price,
                              1,
                              product?.imgSrc
                            );

                            if (!userAddress || userAddress.length === 0) {
                              navigate("/address");
                            } else {
                              navigate("/checkout");
                            }
                          }}
                        >
                          Buy ₹ {product?.price}
                        </button>

                        <button
                          onClick={() =>
                            addToCart(
                              product?._id,
                              product?.title,
                              product?.price,
                              1,
                              product?.imgSrc
                            )
                          }
                          className="btn btn-warning text-dark"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ShowProduct;