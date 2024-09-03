

exports.errorHandler=async(error,req,res,next)=>{
console.log(error)
res.status(error.statusCode||200).send({status:"Error",message:error})
}