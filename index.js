const express = require('express')
const app = express()
require("dotenv").config()
const cors = require('cors');
const { errorHandler } = require('./errorHandler')
require('./dbConfig')


app.use(express.json())
app.use(cors()); 

app.get('/', (req, res) => {
    res.send("Server Running Port No:2000")
})

const user = require("./routes/user")
app.use('/', user)


app.use(errorHandler)
app.listen(process.env.PORT, () => console.log("Server Connected Successfully..."))