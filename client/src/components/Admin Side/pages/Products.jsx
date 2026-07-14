import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";
import { data, useNavigate } from "react-router-dom";
import { useState } from "react";


const Products = () => {

   const navigate=   useNavigate()


      const [category, setCategory] = useState("")
     

  const { products ,  deleteproduct  } = useContext(AppContext);

  // console.log("ye sahi products hai", products);

   
     const AllProducts=  products?.filter((data)=>data?.category?.toLowerCase().includes(category?.toLowerCase().trim()))

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow border-0">

        {/* Header */}
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">All Products</h4>
          <button
            onClick={()=> navigate("/admin/addproduct")}
          className="btn btn-success">+ Add Product</button>
        </div>

        <div className="card-body">

          {/* Search */}
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                 
                onChange={(e)=>setCategory(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Search product by name"
              />
            </div>
          </div>

          {/* Product Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light text-center">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price (₹)</th>
                  <th>Stock/quantaty</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody className="text-center">
                { AllProducts?.length > 0 ? (
                   AllProducts?.map((data, index) => (
                    <tr key={data._id}>
                      <td>{index + 1}</td>

                      <td>
                        <img
                   
                         
                        src={data.imgSrc}
                          alt={data.title}
                          width="50"
                          height="50"
                          className="rounded"
                          style={{ objectFit: "cover" }}
                        />
                      </td>

                      <td>{data.title}</td>
                      <td>{data.category}</td>
                      <td>₹ {data.price}</td>
                      <td>{data.qty}</td>

                      <td>
                        {data.qty > 0 ? (
                          <span className="badge bg-success">In Stock</span>
                        ) : (
                          <span className="badge bg-danger">Out of Stock</span>
                        )}
                      </td>

                      <td>
                        <button 
                         onClick={()=>navigate(`/productEdit/${data._id}`)}  
                        className="btn btn-sm btn-primary me-2">
                          Edit
                        </button>
                        <button 
                        onClick={()=>deleteproduct(data._id) }
                        className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-muted">
                      No Products Found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
