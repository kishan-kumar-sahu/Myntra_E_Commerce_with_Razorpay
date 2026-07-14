import { Cart } from "../Models/Cart.js";

  

    //   create cart or add cart    and increase the qty
export const addToCart =async(req,res)=>{

  const   {  productId, title,  imgSrc } = req.body;

    let  qty = Number(req.body.qty) ;
   let price=  Number(req.body.price);

    try {

    //  const userId = "6975dbd375962c5137fab10d"    

           const userId= req.user;


   
         let cart= await Cart.findOne({userId})

           if(!cart){
        cart = new Cart({userId,items:[]})
           }

           const itemIndex= cart.items.findIndex(item=>item.productId?.toString()===productId)
            
          if(itemIndex>-1) {

     cart.items[itemIndex].qty += qty;
       cart.items[itemIndex].price+= price*qty

          }  


           else{

          cart.items.push({ productId, title, price, qty,imgSrc })
           }


    

          await cart.save();
  res.json({ message:"Items added to cart" , cart})


    } catch (error) {
     
         res.json({message: error.message})
    }



}



         //  get user cart 

 export const userCart= async(req,res)=>{

//  const userId = "6975dbd375962c5137fab10d"    

  const userId= req.user;
  try {
    
  let cart= await Cart.findOne({userId})

    if(!cart){
       return res.json({message:" user cart  not found !!"})
    }


  res.json({message: " user cart  ", cart}) 

  } catch (error) {
   
     res.json({ message:  error.message})
  }



}      



//  delete product or item  to cart 

 export const removeProductFromCart= async(req,res)=>{

  const  productId=  req.params.productId

//  const userId = "6975dbd375962c5137fab10d"    

  const userId= req.user;
  try {
    
  let cart= await Cart.findOne({userId})

    if(!cart){
       return res.json({message:" user cart  not found !!"})
    }


    cart.items=   cart.items.filter(item=> item.productId.toString()!==productId)



  res.json({message: "product remove from cart "}) 


    await   cart.save()   
  } catch (error) {
   
     res.json({ message:  error.message})
  }



 }


//  clear cart 

 export const clearCart= async(req,res)=>{

//  const userId = "6975dbd375962c5137fab10d"    

  const userId= req.user;
  try {
    
  let cart= await Cart.findOne({userId})

    if(!cart){

        cart = new cart({ items:[]})
    }
 else{
    cart.items= [];

 }

    await   cart.save()   
  res.json({message: " cart  cleared  "}) 


 
  } catch (error) {
   
     res.json({ message:  error.message})
  }



 }




 //  decrease  qty from cart  And  remove  cart 

  export const decreaseProductQty = async(req,res)=>{

     const {  productId,  qty } = req.body;
   
   try {
   

      const userId= req.user;
      //  const userId ="6975dbd375962c5137fab10d"  
        let cart= await Cart.findOne({userId})

        if(!cart){
           return  res.json({ message :" cart not found"})
        }

 const itemIndex= cart.items.findIndex(item=> item.productId.toString()===productId)

  if(itemIndex >-1){

    let  item= cart.items[itemIndex]

    if(item.qty> qty ){

      let  priceperunit= item.price/item.qty

       item.qty-=qty;
        item.price-=priceperunit*qty
    }else{

      cart.items.splice(itemIndex,1)
    }

  } else{
 return res.json({ message:"Invalid product id"})

  }

      await cart.save();
    res.json({message: "Item quantaty decrease !" , cart })

   } catch (error) {
      
       res.json({message: error.message})
   }

  }









