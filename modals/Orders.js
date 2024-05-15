
const mongoose = require('mongoose')
const { Schema } = mongoose;
const OrderSchema = new Schema({
    email: {
        type: String, required: true
    },
    orderId:{
        type:String,required:true
    },
    products: {type:Object ,default:{}},
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending", required: true }
}, { timestamps: true })
mongoose.models={}
export default mongoose.model("orders", OrderSchema)