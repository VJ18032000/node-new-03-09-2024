const User = require('../model/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res, next) => {
    try {
        const { name,password,email,phoneNo,profession } = req.body;
        if(!name||!email||!phoneNo||!profession) throw "Missing Crediential"
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
        console.log(user.password)
        console.log(password)
        const isMatch = await bcrypt.compare(password, user.password);
        if(user && !isMatch) throw "Password is mismatch"
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
exports.getUser=async(req,res,next)=>{
    try {
        const user = await User.find({ isActive:true })
        res.send({status:"Success",data:user})
    } catch (error) {
        next(error)
    }
}
exports.deleteUser=async(req,res,next)=>{
    const {id}=req.params
    try {
        const user = await User.findOneAndUpdate({_id:id},{ isActive:false })
        res.send({status:"Success",message:"Delete Successfully"})
    } catch (error) {
        next(error)
    }
}
exports.updateUser=async(req,res,next)=>{
    const {name,phoneNo,profession}=req.body
    try {
        console.log(name)
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, phoneNo, profession }, { new: true });
        res.send({status:"Success",message:"Updated Successfully"})
    } catch (error) {
        next(error)
    }
}