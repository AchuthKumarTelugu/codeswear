import connectDb from "@/middleware/mongoose";
import User from "@/modals/User";
import bcrypt from 'bcrypt'

const Login = async (req, res) => {
    const jwt = require('jsonwebtoken');

    try {
        if (!req.method == "POST") {
            res.status(500).json({ msg: "no such request is available" })
        }
        const { email, password } = req.body;
        console.log('req.body',req.body)
        const users = await User.findOne({ email })
        
        console.log("users", users)
        if (users) {
            if (await bcrypt.compare(password, users.password)) {
                let token=jwt.sign({email:users.email,type:"user"},process.env.jwt_secret_key,{expiresIn:'2h'})//creating token
                res.status(200).json({ success: true, msg: "user found",token:token })
            } else {
                res.status(500).json({ success: false, msg: "Incorrect password" })
            }
        }else{
            res.status(500).json({ success: false, msg: "email not found" })
        }
      

        // res.status(200).json({success:true,msg:"account created!"});

    } catch (error) {
        console.log(error)
    }
}
export default connectDb(Login)
