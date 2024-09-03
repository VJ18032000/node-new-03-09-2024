const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

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
    },
    isActive: {
        type:Boolean,
        default:true
    }
});

usersSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

module.exports = mongoose.model("users", usersSchema)