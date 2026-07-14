import React, { useContext, useEffect, useState } from 'react'
    
import { useNavigate, useParams } from 'react-router-dom'
  import { Link } from 'react-router-dom';
     import AppContext from '../../context/AppContext';
const CategoryProduct = () => {
  
    const {categoryName} = useParams();
       const navigate= useNavigate()
 const [categoryproduct, setcategoryProduct] = useState([])
 
    const {products, addToCart} = useContext(AppContext)

   useEffect(()=>{
   setcategoryProduct(products.filter((data)=> data.category.toLowerCase()===categoryName.toLowerCase()))


   },[categoryName,products])




  return (

   < div  className="d-flex justify-content-center   justify-content-md-around flex-wrap  gap-3 p-3"  >
  {/* <div>ShowProduct</div> */}
    {categoryproduct?.map((product)=>
    
       <div  key={product?._id}>
<div className="card  bg-dark text-white  text-center rounded-4" style={{width: "18rem"}}>

  <Link to={`/product/${product?._id}`}  className=" d-flex justify-content-center align-items-center ">
 <img  src={product.imgSrc} className="card-img-top  rounded-4 m-2" alt="..."  style={{width:"230px" , height: "210px"}}   />
  </Link>

 
  <div className="card-body">
    <h5 className="card-title">{product?.title}</h5>
     {/* <h5 className="card-title">{product.price}</h5> */}
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p> */}
     <div className='    d-flex   gap-3   justify-content-center py-3'>

          <button 
              
            onClick={()=>{

               const token= localStorage.getItem("token")

                 if(!token){
                    return  navigate("/login")
                 }

                 addToCart(product?._id, product?.title, product?.price, 1 ,product?.imgSrc) 
                   navigate("/checkout")
            }}


          className="btn btn-primary"> {"₹"}{" "}{product?.price} </button>

           <button
            
              onClick={()=>addToCart(product?._id, product?.title, product?.price, 1 ,product?.imgSrc) }
          
            className="btn text-dark bg-warning  ">Add to cart</button>
     </div>
  </div>
</div>

</div>   


    

     )}

</div>
  
  )
   

  
}

export default CategoryProduct