import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

  import { useNavigate } from "react-router-dom";

const Address = () => {

     const navigate =  useNavigate();

        const { deliveryAddress  , userAddress}= useContext(AppContext)



       const [fullName, setFullName]= useState("")
        const [phoneNumber, setPhoneNumber]= useState("")
         const [country, setCountry]= useState("")
          const [state, setState]= useState("")
           const [city, setCity]= useState("")
           const [pincode, setPinCode]= useState("")
            const [address, setAddress]= useState("")


     const handlersubmittedForm = async(e)=>{

      e.preventDefault();
    
      try {
         const result = await deliveryAddress(
    fullName,
   address,
   city,
   state,
   country,
   pincode,
    phoneNumber


  );

      navigate("/checkout")
     console.log("Address saved:", result);

       
  
      } catch (error) {
         console.log(" Address is not seved " , error)
      }





 //    or   dono way se kar sakte hai 
  // yaha se 
      //  const addressData = {

  //  fullName,
  //  address,
  //  city,
  //  state,
  //  country,
  //  pincode,
  //   phoneNumber

  //      }




  //  const result = await deliveryAddress(addressData);
  //   console.log("Address saved:", result);

                        
            // yaha tak 


         setFullName("")
        
          setPhoneNumber("")
         setCountry("")
         setState("")
         setCity("")
          setPinCode("")
      
           setAddress("")


              }





  return (
    <div className="container-fluid bg-dark min-vh-100 py-5">
      
      {/* Title */}
      <h1 className="text-center text-white mb-4   fst-italic">
        Delivery Address
      </h1>

      {/* Center Box */}
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">

              <form   onSubmit={handlersubmittedForm}>


                <div className="mb-3  has-validation">
                  <label className="form-label ">Full Name</label>
                  <input type="text"   value={fullName}   className="form-control  " placeholder="Enter full name" onChange={(e)=> setFullName(e.target.value) }   required/>
             

                </div>

                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input type="text"    value={phoneNumber} className="form-control  " placeholder="10-digit mobile number" onChange={(e)=>setPhoneNumber(e.target.value) }  required/>
                </div>


                  <div className="mb-3">
                  <label className="form-label">Country</label>
                  <input type="text"  value={country} className="form-control   " placeholder="Country" onChange={(e)=>setCountry(e.target.value) }   required/>
                </div>


             

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <input type="text"  value={state} className="form-control" placeholder="State" onChange={(e)=>setState(e.target.value)}   required/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input type="text"   value={city} className="form-control" placeholder="City" onChange={(e)=>setCity(e.target.value) }   required />
                  </div>

                  
                </div>

                   <div className="mb-3">
                  <label className="form-label">Pincode</label>
                  <input type="text"  value={pincode} className="form-control" placeholder="Pincode" onChange={(e)=>setPinCode(e.target.value) }   required/>
                </div>

                {/* <div className="mb-3">
                  <label className="form-label">House / Flat / Building</label>
                  <input type="text"  value={house} className="form-control" placeholder="House no, building name"  onChange={(e)=>setHouse(e.target.value) }   required/>
                </div> */}

                <div className="mb-3">
                  <label className="form-label">Area / Street </label>
                  <input type="text"  value={address}  className="form-control" placeholder="Area, street, colony" onChange={(e)=> setAddress(e.target.value) }   required/>
                </div>

                {/* <div className="mb-4">
                  <label className="form-label">Landmark (Optional)</label>
                  <textarea type="text"  value={landmark} className="form-control" placeholder="Nearby landmark" onChange={(e)=>setLandmark(e.target.value) }   />
                </div> */}




    
            <div className="row">
                  <div className="col-md-6 mb-3">
                    <button className="btn btn-dark w-100 py-2">  Save & Continue</button>
                  
                  </div>

                  <div className="col-md-6 mb-3">
                    <Link to={"/cart"}   className="btn btn-primary w-100 py-2">Your Cart</Link>
        
                  </div>
                </div>
                

              </form>


       { userAddress &&(  // agar user exist karega tabhi ye show kar wana hai
 <div className="mb-4 ">
                  <Link to="/checkout"    type="text  "  className="form-control bg-body-secondary fst-italic d-flex justify-content-center"   style={{textDecoration:"none"}}> Use Old Address</Link>
                </div>
       )}


               

              


            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Address;
