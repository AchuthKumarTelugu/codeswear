import connectDb from "@/middleware/mongoose"
import Product from "@/modals/Product"

const handler =async(req,res)=>{
    if(req.method!="POST") {
        return res.status(400).json({error:"Method not allowed" })
    }
 const {cart}=req.body
 for(let key of Object.keys(cart)) {
    let item=cart[key]
    let product=await Product.findOne({slug:key})
    console.log("product.availableQty < item.qty",product.availableQty < item.qty)
    if(product.availableQty < item.qty) {
        return res.status(400).json({"error":true,msg:"Product not available" })
    }
    return res.status(200).json({success:true,msg:"product is available"})
 }
}
export default connectDb(handler)