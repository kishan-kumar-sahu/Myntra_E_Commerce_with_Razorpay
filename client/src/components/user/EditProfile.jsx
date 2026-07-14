// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AppContext from "../../context/AppContext";

// const EditProfile = () => {
//        const navigate=   useNavigate()

//      const { editProfile  , userProfile  , } = useContext(AppContext)


//    const [name, setName]= useState("")
//     const [email, setEmail]= useState("")
//     const [password, setPassword]= useState(null)
//      const [image, setImage]= useState(null)

  

//         useEffect(()=>{
//             if(userProfile){
                
//             setName(userProfile?.name || "")
//             setEmail(userProfile?.email || "")  
            
                 
//             }  
//         },[userProfile])
 


      
//       const handlerButtonClicked =(e)=>{

//       e.preventDefault()

//       const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("password", password);

    
//           if (image) {
//       formData.append("image", image)
//     }
   

//     editProfile(userProfile?._id, formData);
//            navigate("/profile")
//       }      
      
              

//   return (
//     <div className="container d-flex justify-content-center align-items-center py-5">

//       <div className="card shadow-lg border-0 rounded-4" style={{width:"500px"}}>

//         <div className="card-body p-4">

//           <h3 className="text-center fw-bold text-primary mb-4">
//             Edit Profile
//           </h3>

//           <form   onSubmit={handlerButtonClicked}   encType="multipart/form-data">

//             <div className="mb-3">
//               <label className="form-label fw-semibold">Full Name</label>
//               <input
//                 type="text"
//                   onChange={(e)=>setName(e.target.value)}
//                     value={name}
//                 className="form-control rounded-3"
//                 placeholder="Enter your full name"
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-semibold">Email Address</label>
//               <input
//                 type="email"
//                     onChange={(e)=> setEmail(e.target.value)}
//                        value={email}
//                 className="form-control rounded-3"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-semibold">Image</label>
//               <input
//                 type="file"
                
//                   onChange={(e)=>setImage(e.target.files[0])}
//                   name="image"
//                 className="form-control rounded-3"
//                 placeholder="Enter phone number"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="form-label fw-semibold">Password</label>
//               <input
//                 type="password"
//                   onChange={(e)=> setPassword(e.target.value)}
//                     value={password}
//                 className="form-control rounded-3"
//                 placeholder="Enter new password"
//               />
//             </div>

//             <div className="d-grid gap-2">
//               <button className="btn btn-primary py-2 fw-semibold rounded-3">
//                 Update Profile
//               </button>

//               <button
//                 onClick={()=> navigate("/profile")}
//               className="btn btn-outline-secondary rounded-3">
//                 Cancel
//               </button>
//             </div>

//           </form>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default EditProfile;


import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const EditProfile = () => {
  const navigate = useNavigate();

  const { editProfile, userProfile } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile?.name || "");
      setEmail(userProfile?.email || "");
    }
  }, [userProfile]);

  const handlerButtonClicked = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    if (image) {
      formData.append("image", image);
    }

    editProfile(userProfile?._id, formData);
    navigate("/profile");
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 px-2">

      <div className="card shadow-lg border-0 rounded-4 w-100 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">

        <div className="card-body p-3 p-sm-4 p-md-5">

          <h3 className="text-center fw-bold text-primary mb-4">
            Edit Profile
          </h3>

          <form onSubmit={handlerButtonClicked} encType="multipart/form-data">

            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control rounded-3"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control rounded-3"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                name="image"
                className="form-control rounded-3"
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password || ""}
                className="form-control rounded-3"
                placeholder="Enter new password"
              />
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-primary py-2 fw-semibold rounded-3">
                Update Profile
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="btn btn-outline-secondary rounded-3"
              >
                Cancel
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
};

export default EditProfile;