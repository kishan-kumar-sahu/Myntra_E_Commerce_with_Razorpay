import { User } from "../Models/User.js";

  export const addWishlist = async(req,res)=>{

        
          const{productId}= req.params
          
     const userId=req.user
       try {
        
        const  user=  await User.findById(userId)
     

        if(user.wishlist.includes(productId)){
           return   res.json({message:"Already in wishlist"})   
        }

      user.wishlist.push(productId)        
       
         await user.save()
          
          res.json({message: "Added in wishlist", success: true})
              
         

       } catch (error) {
        
         res.json({message: error.message})
       }
  }


    //   get all wishlist   loggedin user
     
     export const getAllWishlist = async(req, res)=>{
           
          
           const userId= req.user
          try {
                 
              const  allwishlist = await User.find(userId).populate("wishlist")
                  if(!allwishlist){
                     return res.json({message: "wishlist not found",  success: false})
                  }

                 
                 res.json({message: "All Wishlist", allwishlist, success: true}) 


          } catch (error) {
              res.json({message: error.message})
          }

     }

    //    remove wishlist 

     export const removewishlist = async(req,res)=>{

            const  {productId} = req.params;
              
        const userId= req.user;

         try {
       
               const user = await User.findById(userId) 

              
              user.wishlist = user.wishlist.filter((item)=>item.toString()!==productId)   


                await user.save()

                res.json({ message: "Removed from wishlist"  , wishlist:user.wishlist , success: true})


         } catch (error) {
             res.status(500).json({error:error.message})
         }
     }