const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    phoneNo: {
        type:String,
        require:true
    },
    profession: {
        type:String,
        require:true
    }
});

module.exports = mongoose.model("users", usersSchema)