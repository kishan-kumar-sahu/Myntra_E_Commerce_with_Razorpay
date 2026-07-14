

import React, { useContext, useEffect } from "react";
import { FaTrashAlt, FaShoppingBag } from "react-icons/fa";
import AppContext from "../context/AppContext";

const AddWishlist = () => {
  const { getAllWishlist, wishlist, removeFromWishlist, addToCart,  } = useContext(AppContext);

  useEffect(() => {
    getAllWishlist();
    
  }, []);

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">

        {/* Header */}
        <div className="mb-4 border-bottom pb-3">
          <h2 className="fw-bold   text-black">
            My <span className="text-danger">Wishlist</span>
          </h2>
          <p className="text-muted small mb-0">
            {wishlist?.length} Saved Items
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="d-flex flex-column gap-4">
          {wishlist && wishlist?.length > 0 ? (
            wishlist.map((item) => (
              <div
                key={item._id}
                className="card shadow-sm border-0 p-3"
              >
                <div className="row align-items-center">

                  {/* Image */}
                  <div className="col-md-2 text-center">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ width: "110px", height: "110px", objectFit: "contain" }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="col-md-8 text-center text-md-start mt-3 mt-md-0">
                    <h5 className="fw-semibold">{item.title}</h5>

                    <p className="text-muted small mb-2">
                      {item.description}
                    </p>

                    <div className="d-flex flex-column flex-md-row align-items-center gap-3">

                      <span className="fw-bold fs-5">
                        ₹{item.price}
                      </span>

                      <button
                        onClick={() =>
                          addToCart(
                            item?._id,
                            item?.title,
                            item?.price,
                            1,
                            item?.imgSrc
                          )
                        }
                        className="btn btn-dark d-flex align-items-center gap-2"
                      >
                        <FaShoppingBag size={14} />
                        Add to Cart
                      </button>

                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="col-md-2 text-center mt-3 mt-md-0">
                    <button
                      onClick={() => removeFromWishlist(item?._id)}
                      className="btn btn-outline-danger rounded-circle"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5 bg-white rounded shadow-sm">
              <h4 className="text-muted">Your wishlist is empty</h4>
              <p className="text-secondary">
                Looks like you haven't added anything yet.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AddWishlist;