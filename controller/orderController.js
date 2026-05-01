
//placing orders using cod
const placeOrder=async (req,res)=>{

}
//placing orders using Stripe
const placeOrderStripe=async (req,res)=>{

}
//placing orders using Razorpay
const placeOrderRazorpay=async (req,res)=>{

}
// All orders data for Admin panel 
const allOrders= async(req,res)=>{

}
// user order data for frontend
const userOrders=async(req,res)=>{

}

//update order status from admin panel 
const updateStatus=async(req,res)=>{

}
const orderController={placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}
export default orderController