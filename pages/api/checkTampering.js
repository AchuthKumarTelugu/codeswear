import connectDb from "@/middleware/mongoose"
import Product from "@/modals/Product"
const handler=async(req,res)=>{
    if(!(req.method=="POST")) {
        res.json(500).json({"msg":"invalid request type"})
    }
  const {cart}=req.body
  
  for(let key of Object.keys(cart)) {
    let item=cart[key]
    let product=await Product.findOne({slug:key})
    console.log(key," : ",item.price,"product in db price :",product.price)
    if(product.price!=item.price) {
      console.log("price mismatch!",product.price,"->",item.price)
      return res.status(500).json({"error":true,msg:"tampering done"})
    }
  }
  return res.status(200).json({"success":true,msg:"tampering not done"})
}
export default connectDb(handler)
