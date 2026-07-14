





 
import React, { useContext, useEffect, useState } from 'react'

import { useNavigate, useParams } from "react-router-dom";
 import axios from "axios"
import RelatedProduct from './RelatedProduct';
import AppContext from '../../context/AppContext';

const productDetails = () => {

       const navigate= useNavigate()

    const {addToCart , userAddress, URL }= useContext(AppContext)
 const  [product, setProduct] = useState(null)

  //  const URL= "http://localhost:3000/api"

const {id}=useParams();

   useEffect(()=>{
 const  getData =async ()=>{


      const api=await axios.get(`${URL}/product/${id}`,{
        headers:{
           "Content-Type" :"application/json"
        }
      })


    console.log(api.data.product)
       setProduct(api.data.product)
 }


  getData();
   },[id])

       if (!product) {
    return <h2 className="text-center mt-5">Loading...</h2>
  } 

  return (
  
<>
  <div className="container d-flex justify-content-center">
  <div
    className="card mb-3 m-4 shadow-lg border-0 rounded-4"
    style={{ maxWidth: "720px" }}
  >
    <div className="row g-0 align-items-center">

      <div className="col-12 col-md-5 text-center p-3">
        <img
        src={product.imgSrc}
          className="img-fluid rounded-4"
         
          style={{ maxHeight: "260px" }}
        />
      </div>

      <div className="col-12 col-md-7 ">
        <div className="card-body px-4">
          <h4 className="card-title fw-bold mb-2">
            {product.title}
          </h4>

          <h5 className="text-success fw-semibold mb-3">
            ₹ {product.price}
          </h5>
            <h5 className="text-success fw-semibold mb-3">
             {product.description}
          </h5>

          <button 
          onClick={()=>{addToCart(product?._id, product?.title, product?.price, 1 ,product?.imgSrc)
           
        }}
          className="btn btn-warning px-4 rounded-pill me-2 mb-2">
            Add to Cart
          </button>

          <button


          onClick={()=>{
               
              const token= localStorage.getItem("token")
                  if(!token){
                      return  navigate("/login")
                  }
                 
            addToCart(product?._id, product?.title, product?.price, 1 ,product?.imgSrc)

                if(!userAddress|| userAddress.length===0){
                   navigate("/address")
                } else{

                 navigate("/checkout");
                }   

              
        }}
          className="btn btn-outline-secondary px-4 rounded-pill">
            Buy Now
          </button>
          
        </div>
      </div>


      

    </div>
  </div>
   <br />

 
</div>
  


  <div>
    <h1 className='text-white  d-flex  justify-content-center'>Related Products</h1>
   </div>
   
                                           <hr />
  {/*  ? means agar product exist karta ho tabhi  product.category karna hai */}
         <RelatedProduct  category={product?.category} />


         </>
    



  )
}

export default productDetails




 