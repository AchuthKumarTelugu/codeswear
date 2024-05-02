import connectDb from '@/middleware/mongoose'
import Product from '@/modals/Product'
import mongoose from 'mongoose'

const handler = async (req, res) => {
    if (req.method == "POST") {
        const { slug } = req.query
        try {
            let product = await Product.find({ slug: slug })
            if (product.length > 0) {
                product = JSON.parse(JSON.stringify(product))
                res.status(200).json({ product })
            } else {
                res.status(400).json({ message: "Invalid slug" })
            }

        } catch (error) {
            console.log(error)
        }

    } else {
        res.status(400).json({ message: "Invalid request method!" })
    }
}
export default connectDb(handler)