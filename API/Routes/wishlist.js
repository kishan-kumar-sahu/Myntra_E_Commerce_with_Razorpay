
  import express  from "express"
   import { addWishlist, getAllWishlist, removewishlist } from "../Controllers/wishlist.js";
import { Authenticated } from "../Middlewares/auth.js";
    
      const router   = express.Router()

    //   api/wishlist/add
  router.post("/add/:productId", Authenticated,   addWishlist)   

  router.get("/all",  Authenticated,getAllWishlist)

router.delete("/remove/:productId",  Authenticated,removewishlist )
       export default router
