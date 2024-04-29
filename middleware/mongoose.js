import mongoose from "mongoose";
const connectDb = handler => async (req,res) => {
  if (mongoose.connections[0].readyState) { //if there is already a connection,return handler with req,res
    return handler(req, res)
  }
  console.log(process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI)
  return handler(req, res)
}
export default connectDb
