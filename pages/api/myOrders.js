import connectDb from '@/middleware/mongoose';
import Orders from '@/modals/Orders';

const handler =async(req,res)=>{
  var jwt = require('jsonwebtoken');
  if(!(req.method=="POST")) {
    res.status(500).json({msg:"error occured1"})
  }
  const {token}=req.body
  jwt.verify(token,process.env.jwt_secret_key,async(err,decoded)=>{
    if(err) {
      res.status(500).json({msg:"error occured2",error:err})
    }
    if (decoded) {
      let orders=await Orders.find({email:decoded.email})
      res.status(200).json(orders)

    }
  })
}
export default connectDb(handler)