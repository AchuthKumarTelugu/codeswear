
const mongoose = require('mongoose')
const { Schema } = mongoose;
const OrderSchema = new Schema({
    userId: {
        type: String, required: true
    },
    products: [{ productId: { type: String }, quantity: { type: Number, default: 1 } }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending", required: true }
}, { timestamps: true })

export default mongoose.modelNames("orders", OrderSchema)