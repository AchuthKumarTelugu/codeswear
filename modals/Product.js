
const mongoose = require('mongoose')
const { Schema } = mongoose;
const productSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true },
    category: { type: String, required: true },
}, { timestamps: true })//gives us created at and updated at property
mongoose.models = {}
export default mongoose.model("products", productSchema)