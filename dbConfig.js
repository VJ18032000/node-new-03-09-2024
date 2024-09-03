const mongoose=require('mongoose')
require("dotenv").config();

mongoose.connect(`${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DBNAME}`)

const db=mongoose.connection;

db.on('error',()=>{
    console.log("user Database Connection Error")
})
db.once('open',()=>{
    console.log("user Database Connected Successfully")
})

module.exports=db;