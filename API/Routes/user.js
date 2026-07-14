 import express from "express"

   import { Authenticated} from "../Middlewares/auth.js"
   import { editProfile, login, profile, register, users } from "../Controllers/user.js";

   import { deleteUser } from "../Controllers/user.js";
   import { adminAuth } from "../Middlewares/adminAuth.js";
     import upload from "../Middlewares/multer.js";
  const router= express.Router();

 // register user
  router.post("/register", register)  //=> /api/user/register

  // login user
  router.post("/login", login)   


      // get ALL USERS
  router.get("/all",    Authenticated,   adminAuth,  users )


  // get user profile 
 router.get("/profile" , Authenticated, profile)

  router.put("/edit/profile/:id", Authenticated,  upload.single("image") ,    editProfile)

 // delete user
//       "  /api/user/deleteuser  "

 router.delete("/deleteuser/:id", deleteUser)
 

export default router