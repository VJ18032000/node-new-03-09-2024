const express=require('express')
const routes=express.Router();

const user=require('../controller/user')

routes.post('/signup',user.register)
routes.post('/login',user.login)


module.exports=routes