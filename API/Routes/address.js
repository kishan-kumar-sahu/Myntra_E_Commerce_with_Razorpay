
import express from "express"

 import { addAddress, editAddress, getAddress } from "../Controllers/address.js";

import {Authenticated } from "../Middlewares/auth.js"

 const router= express.Router();



 
     // add 
 router.post("/add" , Authenticated, addAddress)

 
  // get user
  router.get("/get" , Authenticated, getAddress)
     
            //    api/address/edit
 router.put("/edit", Authenticated,editAddress)

export default router;

