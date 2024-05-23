import connectDb from "@/middleware/mongoose"
import Product from "@/modals/Product"
const handler=async(req,res)=>{
    if(!(req.method=="POST")) {
        res.json(500).json({"msg":"invalid request type"})
    }
  const {cart}=req.body
  
  for(let key of Object.keys(cart)) {
    let item=cart[key]
    let product=await Product.updateOne({slug:key},{$inc:{availableQty:-1}})
   
  }
  return res.status(200).json({"success":true,msg:"updating cart items with db done"})
}
export default connectDb(handler)
