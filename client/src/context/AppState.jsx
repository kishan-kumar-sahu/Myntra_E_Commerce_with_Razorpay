
import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'

import axios from "axios"

import {  toast } from "react-toastify";


const AppState = (props) => {



    const URL="http://localhost:3000/api"

    

              ///   theme functionality 

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light" );





  const [products, setProducts] = useState([])

   
   const [isLoggedIn ,setIsLoggedIn] = useState(false)



  const [userProfile , setUserProfile] = useState("")


 const [userCart, setUserCart] = useState({ items: [] })

    const [reload, setReload] = useState(false)

      const [userAddress, setUserAddress] = useState("")

       const [userOrder, setUserOrder] = useState([])


     const [orders, setAllOrders]=  useState([])
     const [order, setsingleOrder]=  useState("")



        const [user, setAllUsers]=  useState([])

  const [singleProduct, setSingleProduct]= useState("")

   const [cancelOrder, setCancelOrder]= useState("")

      const [alluserOrder, setAllUserOrders] = useState([])
         const[role, setRole]= useState(null)
        const [AdminLogedIn, setAdminLogedIn] =  useState(false)

    const [wishlist, setAllWishList]= useState([])


   const UserAndAdminLogin=async(email, password)=>{
   try {
    
      const res=await  axios.post(`${URL}/user/login`,{email, password})

         console.log(" current res",res)
  

          
              if(res.data.success){
    
               const {token ,message, role}= res.data

              if(role==="admin"){
                localStorage.setItem('adminToken', token)
                     setAdminLogedIn(true) 
                        
                     
              }
            
             if(role==="user"){
              localStorage.setItem('token',token)
                 setIsLoggedIn(true) 
                    
             }

          setRole(role)

        toast.success(message)
            return  role
              }
               
            
   } catch (error) {
    
     toast.error( error?.response?.data.message|| error.message)
   }
   }

      
  



  useEffect(() => {

  const adminToken = localStorage.getItem("adminToken")
  const userToken = localStorage.getItem("token")

  if(adminToken){
    setAdminLogedIn(true)
    setRole("admin")
  }
  else if(userToken){
    setIsLoggedIn(true)
    setRole("user")
  }

},[])



  

  
    //  LOGOUT FUNCTION
      const logout = () => {
    localStorage.removeItem("token"); // token delete
    setIsLoggedIn(false);              // auth false
  };


     // fetch all product
useEffect(()=>{

  const fetchproduct = async()=>{

   const  api= await axios.get(`${URL}/product/all`,{
    headers:{
      "Content-Type": "application/json",
         
    }
     
   })

    // console.log(api.data.products)

    setProducts(api.data.products)
  }
 
    fetchproduct()



    },[reload])






   // user profile  hai 
       useEffect(()=>{
  const userProfilee =async()=>{

   const res=await  axios.get(`${URL}/user/profile`,{
  headers:{
    "Content-Type": "application/json",
    "Auth": localStorage.getItem("token")
  }

   })
    
      // console.log( res.data.user)
    setUserProfile(res.data.user)

  }

   userProfilee()


  },[isLoggedIn ])

                        // edit profile 

   
    const editProfile =async(id, formData )=>{
        try {
          const  res= await axios.put(`${URL}/user/edit/profile/${id}`,
            
             formData,{
              headers:{
              
                  Auth:localStorage.getItem("token")
              }
             }
          
          )   
          
                 if(res.data.success){
            setUserProfile(res.data.updateUserprofile)
                 }
          

        } catch (error) {
         
           toast.error({ message:error?.response?.data?.message})  
        }
    } 



     // add to cart  hai 



  const   addToCart = async(productId, title, price, qty,imgSrc)=>{

   const  api= await axios.post(`${URL}/cart/add`,
    
    { productId, title, price, qty,imgSrc },
    {
    headers:{
      "Content-Type": "application/json",
      "Auth": localStorage.getItem("token")
    }
   })


    // setReload(!reload)
   toast.success(api.data.message)
    //  console.log("my cart:", api)
     await   getUserCart()  
  
  }
  

  const  getUserCart =async()=>{

   const api=await  axios.get(`${URL}/cart/user`,{
  headers:{
    "Content-Type": "application/json",
    "Auth": localStorage.getItem("token")
  }

   })
    
      // console.log( "users cart:",api.data.cart)
      setUserCart(api.data.cart)
 
  }

    
    
  //  // get user cart 

     useEffect(()=>{
    if(isLoggedIn)
   
       getUserCart()
       
     },[isLoggedIn])


   // remove qty

 const   decreaseQty =async( productId, qty)=>{

   const api=await  axios.post(`${URL}/cart/--qty`,{productId, qty},
    {
  headers:{
    "Content-Type": "application/json",
    "Auth": localStorage.getItem("token")
  }

   })

    toast.success(api.data.message)
    
    // setReload(!reload)
     await   getUserCart()  
    
  }

//   remove   item  from cart

 const    RemoveFromCart =async( productId )=>{

   const api=await  axios.delete(`${URL}/cart/remove/${productId}`,
    {
  headers:{
    "Content-Type": "application/json",
    "Auth": localStorage. getItem("token")
  }

   })

    toast.success(api.data.message)
    
    // setReload(!reload)
     await   getUserCart()  
    
  }



  // clear cart 

 const     ClearCart =async( productId )=>{

   const api=await  axios.delete(`${URL}/cart/clear`,
    {
  headers:{
    "Content-Type": "application/json",
    "Auth": localStorage. getItem("token")
  }

   })

    toast.success(api.data.message)
    
    // setReload(!reload)
     await   getUserCart()  
    
  }



    // for Address 


  const  deliveryAddress = async ( fullName,address,city, state, country, pincode, phoneNumber)=>{

   try {
     const  res =await axios.post(`${URL}/address/add`,

   { fullName,address,city,state,country,pincode, phoneNumber},

        {
           headers:{
            "Content-Type":"application/json",
             "Auth":localStorage.getItem("token")
           }
        }
        )
           
  toast.success(res.data.message)
       await getUserAddress();
     return res.data;
    
   } catch (error) {
    
       toast.error(error.response?.data?.message)
   }

  }
     

  //  get user latest  Address

   useEffect(()=>{
    if(isLoggedIn){
    getUserAddress()
      getUserOrder()
    }
   
   }, [isLoggedIn])

   
 const  getUserAddress=async()=>{

   const api=await axios.get(`${URL}/address/get`,{
  headers:{
    "Content-Type": "application/json",
    "Auth": localStorage.getItem("token")
  }

   })


  //  console.log("userAddress:" , api.data.userAddress)


  setUserAddress(api.data.userAddress)
          
  }


    const editAddress=async(fullName, address, city, state, phoneNumber, country, pincode)=>{

                if(!fullName|| !address||!city||!state|| !phoneNumber ||!country || !pincode){
              toast.error( "All fields are required" )
                return 
          }
                   
         try {
             const res= await axios.put(`${URL}/address/edit`,
              {fullName, address, city, state, phoneNumber, country, pincode},
            {
              headers:{
                Auth:localStorage.getItem("token")
              }
            })
                      if(res.data.success){
                        setUserAddress(res.data.editAddress)      
                      toast.success(res.data.message )
                  return true
                      }
                      toast.error(res.data.message)
                        return false
            
            
         } catch (error) {
          
            toast.error(error?.response?.data?.message)
              return false
         }
    }


      // get user order 
  const  getUserOrder=async()=>{

   const api=await axios.get(`${URL}/payment/userorder`,{
  headers:{
    "Content-Type": "application/json",
    "Auth": localStorage.getItem("token")
  }

   })

   
       
  //  console.log("user order current wala  : ", api.data)
 

     setUserOrder(api.data)
      
  }





      //     login user see all own oder 

      const UserAllOrder=async()=>{

         try {
            const res=await axios.get(`${URL}/order/alluserorder`,{
              headers:{
                Auth:localStorage.getItem("token")
              }
            })
              setAllUserOrders(res.data.allOrderofUser)
              // console.log("resres", res.data.allOrderofUser)

         } catch (error) {
          
         }
     }

                    //    wishlist 

 
 
     



const addeishlist = async (product) => {

  const token = localStorage.getItem("token");

  // =========================
  // USER NOT LOGGED IN
  // =========================

  if (!token) {

    let guestWishlist =
      JSON.parse(localStorage.getItem("guestWishlist")) || [];

    const exists = guestWishlist.find(
      (item) => item._id === product._id
    );

    if (exists) {
      alert("Already in wishlist");
      return;
    }

    guestWishlist.push(product);

    localStorage.setItem(
      "guestWishlist",
      JSON.stringify(guestWishlist)
    );

    alert("Added to wishlist");

    return;
  }

  // =========================
  // LOGIN USER
  // =========================

  try {

    const res = await axios.post(
      `${URL}/wishlist/add/${product._id}`,
      {},
      {
        headers: {
          Auth: token
        }
      }
    );

    console.log(res.data);

    alert("Wishlist Added");

  } catch (error) {

    console.log(error);

  }
};



const syncGuestWishlist = async () => {

  const token = localStorage.getItem("token");

  const guestWishlist =
    JSON.parse(localStorage.getItem("guestWishlist")) || [];

  // agar token nahi ya wishlist empty
  if (!token || guestWishlist.length === 0) return;

  try {

    for (const item of guestWishlist) {

      await axios.post(
        `${URL}/wishlist/add/${item._id}`,
        {},
        {
          headers: {
            Auth: token
          }
        }
      );
    }

    // sync ke baad localStorage clear
    localStorage.removeItem("guestWishlist");

    console.log("Guest wishlist synced");

  } catch (error) {

    console.log(error);

  }
};

 useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {
     syncGuestWishlist();
  }

}, [isLoggedIn]);





          //  loggedin uset get all wishlist

    const getAllWishlist= async()=>{
           try {
              const res= await axios.get(`${URL}/wishlist/all`,{
                headers:{
                "Content-Type" : "application/json",
                   Auth: localStorage.getItem("token")
                }
              })
                   console.log(" get all wishjkis axios", res)

                 setAllWishList(res.data.allwishlist[0].wishlist)
           } catch (error) {
           
             toast.error({ message: error.message})
           }
    }

    const removeFromWishlist = async(id)=>{
         try {
            const res= await axios.delete(`${URL}/wishlist/remove/${id}`,{
              headers:{
                Auth : localStorage.getItem("token")
              }
            })
    
              
              //  console.log("remove", res)
                
           setAllWishList((prev)=> prev.filter((item)=> item._id!==id) )
                  toast.success({message: res.data.message})

         } catch (error) {
          
             toast.error({message: error?.response?.data?.message})
         }
    }





         // for admin 





      // add product


//  "Content-Type": "multipart/form-data",

  //  const addproduct=async (formData )=>{

    
        

    


     const addproduct=async (formData )=>{

    
        
     
     try {
       const res=await axios.post(`${URL}/product/add`,
          formData,
      {
        headers:{
           Auth: localStorage.getItem("adminToken")
        }
      }
   
)
      console.log("product api wala", res)
   toast.success(res.data.message)
  
       setReload(prev => !prev);
      return true 
       
     
      
     } catch (error) {
     
        console.log({message: error.message}) 
          return false
     }
           
  }
 

      // all orders  for admin  side  

  const getallOrders = async () => {
  try {
    const res = await axios.get(`${URL}/order/allorder`, {
      headers: {
        "Content-Type": "application/json",
         Auth: localStorage.getItem("adminToken")
      },
    });

     console.log("allorders appstore wala", res.data);

     setAllOrders(res.data.orders);
    
    toast.success(res.data.message);

  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error("Failed to fetch orders");
  }
};


        // update status  for  for admin


const updateStatusatoAdmin= async(orderId, status)=>{
  
     try {
      const res=await  axios.put(`${URL}/order/update-status/${orderId}`,
        {status},
   {
          headers: {
            "Content-Type":"application/json",
            Auth: localStorage.getItem("adminToken"),
          },
        }
   )


       toast.success(res.data.message)
     return true;
      
     } catch (error) {
       
      console.log({ message:error.message})
       return false
     }


  }



      // get single order      view  single  Order   for admin    

     const  getsingleOrder = async (orderId) => {
        // console.log("orderId", orderId)
    //    const res = await axios.get(`${URL}/order/${orderId}`,
  try {
    const res = await axios.get(`${URL}/order/admin/${orderId}`, {
       
      headers: {
        "Content-Type":"application/json",
          Auth: localStorage.getItem("adminToken"),  
      },
    });
      
      console.log("aa gya", res)
   console.log("API response  abhi :", res.data);
     setsingleOrder(res.data)
    toast.success(res.data.message);

  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error("Failed to fetch orders");
  }
};



 
     





               //  get all users  for admin

      const getAllUsers = async () => {
  try {
    const res = await axios.get(`${URL}/user/all`, {
      headers: {
        "Content-Type": "application/json",
          Auth: localStorage.getItem("adminToken")
    
      },
    });

    //  console.log("allusers", res.data);

       setAllUsers(res.data)
    
    toast.success(res.data.message);

  } catch (error) {
    console.log(error.response?.data.message || error.message);
    toast.error("Failed to fetch Users");
  }
};



  // delete user  through the admin 

  const DeleteUsers=async(id)=>{

    const res= await axios.delete(`${URL}/user/deleteuser/${id}`,{
        headers:{
          Auth:localStorage.getItem("adminToken")
        }
    }) 
    
    toast.success(res.data.message)

     setAllUsers((prev) => prev.filter((user) => user._id !== id));

  }


      //   update product     // through the admin

   const  UpdateProduct= async (id,title, description, price ,category, qty, imgSrc )=>{

      const res= await axios.put(`${URL}/product/${id}`,
        { title, description, price ,category, qty, imgSrc},
        {
          headers:{
            "Content-Type":"application/json",
              Auth: localStorage.getItem("adminToken")

          }
        }
      )
    

      setProducts((prev) =>
  prev.map((item) =>
    item._id === id
      ? { ...item, title, description, price, category, qty, imgSrc }
      : item
  )
);


        toast.success(res.data.message)
          
          
   }



       // get  single product by id 

        const  GetProduct= async (id)=>{
 const res= await axios.get(`${URL}/product/${id}`,{
   headers:{
    Auth: localStorage.getItem("adminToken")
   }
 })

      
    
  //  console.log("res.data", res.data.product)

      setSingleProduct( res.data.product)          
 
  
   }

  
      //  delete product by id 
         
      const deleteproduct =async(id)=>{
   
      const res= await axios.delete(`${URL}/product/${id}`,{
         headers:{
          Auth: localStorage.getItem("adminToken")
         }
      })
        
         setProducts((prev)=> prev.filter((data)=>data._id!==id))

          toast(res.data.message)
      }

 

     //  cancil order by user
   

      const   cancelOrderByUser = async (id) => {
  try {
    const res = await axios.put(
      `${URL}/order/cancel/${id}`,
      { status: "cancelled" }
    );

    console.log("cancel order", res.data);
      setCancelOrder(res.data)

  } catch (error) {
    console.log("Cancel error:", error.response?.data || error.message);
  }
};


     const handleAdminLogout=()=>{
       setAdminLogedIn(false)   
       localStorage.removeItem("adminToken")
       setRole(null)
          
               

     }


                    //    theme functionality 


 

const toggleTheme = () => {
  setTheme((prev) => {
    const newTheme = prev === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    return newTheme;
  });
};
  
useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);


  return (
    

   <AppContext.Provider  value={
    {
UserAndAdminLogin,
      products ,
      isLoggedIn,
      setIsLoggedIn,
      logout,
      userProfile,
      
        editProfile ,
      addToCart,
      userCart,
      decreaseQty,
      RemoveFromCart,
      ClearCart ,
      deliveryAddress,
          
    
       userAddress,
         editAddress,
        URL,

        userOrder,
        getUserOrder,
              
          // loginAdmin,

          addproduct,

          orders,
           updateStatusatoAdmin,

            getsingleOrder,
           order,
           getallOrders,
            

           user,


            DeleteUsers,

              GetProduct,

                singleProduct,
                UpdateProduct,

               
                  deleteproduct,

                  // registerAdmin,

                    // getallOrders,
                      getAllUsers,

                   cancelOrderByUser,
                   cancelOrder,
                   UserAllOrder,
                   alluserOrder,
                     role,
                       setAdminLogedIn,
                          setRole,
                          handleAdminLogout,
                            addeishlist,
                            getAllWishlist ,
                             wishlist,
                             removeFromWishlist,
                              
                                 theme,
                               toggleTheme,
                              
                                   
                               
                                   
                              
                         
                  
                      
       




     }}>

     {props.children}
   </AppContext.Provider> 
  )
}

export default AppState


