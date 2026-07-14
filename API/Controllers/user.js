import { User } from "../Models/User.js";

  import bcrypt   from "bcryptjs"

  import jwt from "jsonwebtoken";

   
  // user register
export const register =async(req,res)=>{

   const {name, email, password} = req.body;
      
    try {
       

    let user= await User.findOne({email})

    if(user){
        return res.json({ message: "User Allready exist" ,success: false})
    }

      const hashpassword= await  bcrypt.hash(password,10)
        user= await User.create({ name, email, password : hashpassword})

 
      res.json({ message: "User register Successfully!!" ,user,success:true })

    } catch (error) {
       
      res.json({ message: error.message})     

    } 
              


}




   // user login 


export const login = async(req,res)=>{

  const {email, password} = req.body
  try {
      
    let user= await User.findOne({email})
    
     if(!user){
      return res.status(404).json({ message: "User not  found ", success: false})
     }

   const validPassword= await bcrypt.compare(password, user.password)

      if(!validPassword){
return res.status(401).json({ message: "Invalid credentials" , success: false});
      }

 

   const token = jwt.sign({ userId: user._id , role:user.role}, process.env.JWT_SECRET ,{ expiresIn: "365d" })

     res.status(200).json({message:`welcome ${user.name}` ,  token ,role:user.role   ,success: true })

  } catch (error) {
    
    res.json({message: error.message})
  }

}

//   get profile 

export const profile = async(req,res)=>{

  res.json({user: req.user})


}


  export const editProfile =async(req,res)=>{

          // console.log("req.file", req.file)     
           
       const {id}= req.params;
            
         const Allbody= req.body;
           
      try {
        
        const editUser= await User.findById(id)
        if(!editUser){
            return res.json({message:" user not found", success: false})
        }

  
                   if(Allbody.password){
                    Allbody.password=await  bcrypt.hash(Allbody.password, 10)
                   }

                 // image from cloudinary
          if (req.file) {
      Allbody.image = req.file.path
        }

               


    const updateUserprofile= await User.findByIdAndUpdate(id, Allbody, {new: true})

           if(!updateUserprofile){
              return  res.json({message: "User not found ", success: false})
           }


            res.json({message:"Profile Update Successfully",  updateUserprofile,success: true})

      } catch (error) {
        
         res.json({message: error.message})
      }
  }


    //      for admin

        
                 // get  All user
export const users = async(req,res)=>{

  try {
   
   let user= await User.find().sort({createdAt:-1})  

    
      res.json(user)

  } catch (error) {
    res.json({message: error.message})
    
  }

}



//  delete users 


      export const deleteUser =async (req,res)=>{


      const { id } = req.params;

   const user= await User.findByIdAndDelete(id)

     if(!user){
       return res.json({message:"user does not exist ", success:false})
     }

      res.json({message:"user has been deleted ", success:true , user})
       
        
    }






