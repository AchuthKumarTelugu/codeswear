import connectDb from "@/middleware/mongoose";
import Orders from "@/modals/Orders";
const handler = async(req,res) => {
    const {email,orderId,address,amount,status,products}=req.body
    await Orders.create({email,orderId,address,amount,status,products})
    res.status(200).json({msg:"your order has placed",success:true,data:req.body})
  
}
export default connectDb(handler)
