import connectDb from "@/middleware/mongoose";
import User from "@/modals/User";
import bcrypt from 'bcrypt'
const signup = async (req, res) => {
   
    try {
        if (req.method != "POST") {
            res.status(500).json({ success:false,msg: "no such request is available" })
        }
        const {name,email,password}=req.body;
        console.log(req.body)
        const salt=await bcrypt.genSalt(10)
        const encryptedPassword=bcrypt.hashSync(req.body.password,salt)
        console.log("name",name,"email",email,"password",encryptedPassword)
        await User.create({name,email,password:encryptedPassword})
        res.status(200).json({success:true,msg:"account created!"});
         
    } catch (error) {
        console.log(error)
    }
}
export default connectDb(signup)
