
     export    const   adminAuth=(req,res, next)=>{

         if(req.user.role!=="admin"){
               return  res.json({message:"Access Denied ", success: false})

                
         }


            next()
      }








