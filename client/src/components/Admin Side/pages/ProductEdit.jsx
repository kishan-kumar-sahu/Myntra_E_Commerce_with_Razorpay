import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../../context/AppContext";
const ProductEdit = () => {

  const navigate= useNavigate()

     const {id}= useParams()
      
  
 const {GetProduct , singleProduct , UpdateProduct  }=useContext(AppContext)
     
        const [title, setTitle]=useState("")
        const [ description, setDescription]=useState("")
        const [price, setPrice]=useState("")
        const [category, setCategory]=useState("")
        const [qty, setQty]=useState("")
        const [imgSrc, setImgSrc]=useState("")




 useEffect(() => {
    GetProduct(id);
  }, [id]);


  useEffect(() => {
    if (singleProduct) {
      setTitle(singleProduct.title || "");
      setDescription(singleProduct.description || "");
      setPrice(singleProduct.price || "");
      setCategory(singleProduct.category || "");
      setQty(singleProduct.qty || "");
      setImgSrc(singleProduct.imgSrc || "");
    }
  }, [singleProduct]);





  const handlerSubmit=async(e)=>{
    e.preventDefault()

    //  console.log(title, description, price, category, qty, imgSrc) 
    
 await  UpdateProduct(
     id,
     title,
      description,
       price,
        category, 
        qty, 
        imgSrc
    ) ;
    
       
 navigate("/admin/products")

      
  }


  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">

          <h4 className="fw-bold mb-4 text-center">Edit Product</h4>

          <form   onSubmit={handlerSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Product Title</label>
              <input
                  
                   onChange={(e)=>setTitle(e.target.value)}

                    value={title}
                type="text"
                className="form-control rounded-3"
                placeholder="Enter product title"
              />
            </div>

              {/* Description */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Description</label>
              <textarea

                 onChange={(e)=>setDescription(e.target.value)}
               value={description}
                className="form-control rounded-3"
                rows="4"
                placeholder="Enter product description"
              ></textarea>
            </div>

           

            {/* Price */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Price</label>
              <input
                 onChange={(e)=>setPrice(e.target.value)}
                  value={price}
                type="number"
                className="form-control rounded-3"
                placeholder="Enter price"
              />
            </div>
              {/* Category */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Category</label>
              <input
                 onChange={(e)=>setCategory(e.target.value)}
                  value={category}

                type="text"
                className="form-control rounded-3"
                placeholder="Enter category"
              />
            </div>

               {/* quantaty*/}
            <div className="mb-3">
              <label className="form-label fw-semibold">Quantaty</label>
              <input
                 onChange={(e)=>setQty(e.target.value)}

             value={qty}
                type="Number"
                className="form-control rounded-3"
                placeholder="Enter category"
              />
            </div>


            {/* Image */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Image URL</label>
              <input
                 onChange={(e)=>setImgSrc(e.target.value)}
                value={imgSrc}
                type="text"
                className="form-control rounded-3"
                placeholder="Paste image link"
              />
            </div>

          

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button 
               onClick={()=> navigate("/admin/products")}
              type="button" className="btn btn-outline-secondary rounded-pill px-4">
                Cancel
              </button>

              <button
               type="submit" className="btn btn-primary rounded-pill px-4">
                Update Product
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
