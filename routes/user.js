const express=require('express')
const routes=express.Router();

const user=require('../controller/user')

routes.post('/register',user.register)
routes.post('/login',user.login)
routes.get('/user',user.getUser)
routes.delete('/user/:id',user.deleteUser)
routes.put('/user/:id',user.updateUser)


module.exports=routes