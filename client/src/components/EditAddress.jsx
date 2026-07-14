import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useEffect } from "react";

const EditAddress = () => {
      const { editAddress, userAddress}=useContext(AppContext)

               console.log("userAddresshhhhhhhhhhhhhhhh kishankumar sahu",userAddress)
       const navigate=  useNavigate()

           const [fullName, setFullName]= useState("")
           const [address, setAddress]= useState("")
           const [city, setCity]= useState("")
           const [state, setState]= useState("")
           const [phoneNumber, setPhoneNumber]= useState("")
           const [country, setCountry]= useState("")
            const [pincode, setPinCode]= useState("")
    

    useEffect(()=>{
        if(userAddress){

             setFullName(userAddress?.fullName|| "")
            setAddress(userAddress.address||"")
            setCity(userAddress.city||"")
            setState(userAddress.state||"")
            setPhoneNumber(userAddress.phoneNumber||"")
             setCountry(userAddress.country||"")
             setPinCode(userAddress.pincode||"")

              }
          },[userAddress])



   const handlerSubmitButton=async(e)=>{

     e.preventDefault()

      

 const success=    await  editAddress(fullName, address, city, state, phoneNumber, country, pincode)
    //    console.log(fullName, address, city, state, phoneNumber, country, pincode )  

            if (success){
                navigate("/checkout")
            }

   }            

            
  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-dark text-white text-center">
              <h4 className="mb-0">Edit Address</h4>
            </div>

            <div className="card-body">

              <form   onSubmit={handlerSubmitButton}>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                     onChange={(e)=>setFullName(e.target.value)}
                      value={fullName}
                    className="form-control"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                      onChange={(e)=>setAddress(e.target.value)}
                       value={address}
                    className="form-control"
                    placeholder="Enter address"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                      onChange={(e)=>setCity(e.target.value)}
                       value={city}
                    className="form-control"
                    placeholder="Enter city"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                       onChange={(e)=>setState(e.target.value)}
                        value={state}
                    className="form-control"
                    placeholder="Enter state"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                      onChange={(e)=>setCountry(e.target.value)}
                       value={country}
                    className="form-control"
                    placeholder="Enter country"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                         onChange={(e)=>setPinCode(e.target.value)}
                          value={pincode}
                    className="form-control"
                    placeholder="Enter pincode"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                      onChange={(e)=>setPhoneNumber(e.target.value)}
                       value={phoneNumber}
                    className="form-control"
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="d-flex  gap-4  w-full">
                 
                    <button 
                       onClick={()=>navigate("/checkout")}
                    className="btn btn-danger " style={{ width:"40%"}}>
                      Cancil
                  </button>
                   <button className="btn btn-primary " style={{ width:"60%"}}>
                    Update Address
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

export default EditAddress;