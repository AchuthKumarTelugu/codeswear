import connectDb from "@/middleware/mongoose";
import Product from "@/modals/Product";
const handler = async (req, res) => {
    if (req.method == "POST") {
        console.log(req.body);
        for (let i = 0; i < req.body.length; i++) {
           await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
        }
        return res.status(200).json({ success:true })

    } else {
        return res.status(400).json({ error: "error has occured" })
    }

}
export default connectDb(handler)
