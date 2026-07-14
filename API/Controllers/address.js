
 import {Address} from "../Models/Address.js"

export const addAddress = async(req,res)=>{

  let  {fullName, address,city, state, country, pincode, phoneNumber} = req.body
   let userId= req.user; 

  try {


let useraddress= await Address.create({

     userId,
    fullName,
     address,
     city,
      state, 
      country,
      pincode,
     phoneNumber  
    })


     res.json({message: "Address Added"  ,useraddress})


    
  } catch (error) {
    
 res.json({message: error.message})

    
  }

   }


     



    // get All address
 export const getAddress= async(req,res)=>{
  
    //  const userId = req.user;  or userId:req.user

   try {
    

    let AllUsersAddress= await Address.find({userId:req.user }).sort({createdAt:-1})

 res.json({message: "Address", userAddress: AllUsersAddress[0]})


   } catch (error) {
    res.json({message: error.message})
   }

   }



     export const editAddress= async(req,res)=>{
      
               //   const {addressId}= req.params
                 const  userId= req.user
               const allbody= req.body
              
          try {
           
             const  editAddress = await Address.findOneAndUpdate({ userId: userId }, allbody, {new: true})

              if(!editAddress){
                return res.json({message: "Address not Found", success: false})
              }
               
                   res.json({message: "Address Update Successful", editAddress, success: true })

          } catch (error) {
           
            res.json({message: error.message})
          }
     }
