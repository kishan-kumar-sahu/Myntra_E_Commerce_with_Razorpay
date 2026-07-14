import React, { useContext, useEffect, useState } from "react";

import axios from "axios"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";
const Register = () => {
   
       const {URL}= useContext(AppContext)
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const navigate= useNavigate()
         

  const handleSubmit = async(e) => {
    e.preventDefault();

  //  const url= "http://localhost:3000/api/user/register"
  
     const url= `${URL}/user/register`
      
     try {
        
  const res= await axios.post(url,
    { name, email, password},
     { headers: { "Content-Type": "application/json" } }

)

  


        if (!res.data.success) {  // (res.data.success=== false)
    toast.error(res.data.message); //   "User Already exist"
    return;
  }

   toast.success(res.data.message || "Registered successfully");
         
      navigate("/login")
       console.log(res)



 } catch (error) {
         
toast.error("Something went wrong");
  }
        






  setName("")
    setEmail("")
     setPassword("")
     
      
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-4 fw-bold">Register</h3>

        <form onSubmit={handleSubmit}>

              {/* for name  */}
            <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>


          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button className="btn btn-primary w-100 rounded-pill">
            Register
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Register;
