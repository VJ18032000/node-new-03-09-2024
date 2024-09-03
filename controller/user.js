const User = require('../model/user')
const jwt=require('jsonwebtoken')


exports.register = async (req, res, next) => {
    try {
        const { name,password,email,phoneNo,profession } = req.body;
        if(!name||!lastName||!email||!phoneNo||!profession) throw "Missing Crediential"
        const userFind=await User.findOne({email:email})
        if(userFind) throw "Already email taken"
        const user = new User({ name,password,email,phoneNo,profession })
        const result = await user.save()

        res.send({
            status: "Success",
            "message": "User created successfully",
            "user_details": result
        }
        )
    } catch (error) {
        next(error)
    }
}
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if(!user)  throw "User not found"
        if(user && user.password!=password) throw "Password is mismatch"
        const payload={email:user.email,name:user.name}
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "365d" }
        );

        res.send({
            status: "Success",
            "message": "Login successful",
            "token": accessToken,
            "user_details": {
                "id": user._id,
                "name": user.name,
                "email": user.email
            }
        }
        )
    } catch (error) {
        next(error)
    }
}