import connectDb from "@/middleware/mongoose";
import Product from "@/modals/Product";
const handler = async (req, res) => {
    if (req.method == "POST") {
        console.log(req.body);
        for (let i = 0; i < req.body.length; i++) {
            let p = new Product({
                title: req.body[i].title,
                slug: req.body[i].slug,
                desc: req.body[i].desc,
                img: req.body[i].img,
                size: req.body[i].size,
                color: req.body[i].color,
                price: req.body[i].price,
                category:req.body[i].category,
                availableQty: req.body[i].availableQty,
            })
            await p.save()
        }
        let products = await Product.find({})
        return res.status(200).json({ success:true })

    } else {
        return res.status(400).json({ error: "error has occured" })
    }

}

export default connectDb(handler)
