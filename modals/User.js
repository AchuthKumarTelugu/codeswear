
const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
}, { timestamps: true })//gives us created at and updated at property
mongoose.models={}
export default mongoose.model("users", userSchema)