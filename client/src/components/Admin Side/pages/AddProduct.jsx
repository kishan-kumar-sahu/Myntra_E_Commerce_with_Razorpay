



import React, { useContext, useState } from "react";
import AppContext from "../../../context/AppContext";
 import  {useNavigate} from "react-router-dom"
 
const AddProduct = () => {

  
   const navigate= useNavigate()
  const {addproduct }= useContext(AppContext)

const [title, setTitle]= useState("")
const [description, setDescription]= useState("")
const [price, setPrice]= useState("")
const [category, setCategory]= useState("")
const [qty, setQty]= useState("")
const [imgSrc, setImgSrc]= useState(null)

   
const submithandlingBUtton = async (e) => {
  e.preventDefault();


  const formData= new FormData();


    formData.append("title", title);
    formData.append("description", description);
     formData.append("price",price);
    formData.append("category",category);
    formData.append("qty", qty);
    formData.append("imgSrc",imgSrc);
   
 

// console.log("current data", title, description, price, category, qty, imgSrc)

   console.log("imgSrc =", imgSrc);

   const success = await addproduct(formData)

  if(success){
    navigate("/admin/products")
  }

}



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white text-center">
              <h4 className="mb-0">Add New Product</h4>
            </div>

            <div className="card-body">
              <form onSubmit={submithandlingBUtton}>
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                     onChange={(e)=>setTitle(e.target.value)}
                      value={title}
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                  />
                </div>
                
               <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 

                      onChange={(e)=>setDescription(e.target.value)}
                       value={description}
                    className="form-control"
                    rows="3"
                    placeholder="Product description"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Price (₹)</label>
                  <input
                       onChange={(e)=>setPrice(e.target.value)}
                        value={price}
                    type="number"
                    className="form-control"
                    placeholder="Enter price"
                  />
                </div>

                  <div className="mb-4">
                  <label className="form-label">Product quantaty</label>
                  <input type="Number" 
                  onChange={(e)=>setQty(e.target.value)}
                     value={qty}
                  className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                   <input type="text" 
                  onChange={(e)=>setCategory(e.target.value)}
                   value={category}
                  className="form-control" />
                
                </div>


                <div className="mb-4">
                  <label className="form-label">Product Image</label>
                  <input type="file" 
                  
                  //  onChange={(e)=> setImgSrc(e.target.value)}
                   onChange={(e)=>setImgSrc(e.target.files[0])}
                 
                      name="imgSrc"
                  className="form-control" />
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btn-lg">
                    Add Product
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;