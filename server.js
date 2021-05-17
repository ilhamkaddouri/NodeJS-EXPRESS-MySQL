const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config()
const mysqlconnection = require('./connection')

const userRouter= require('./routes/user')

app.use(express.json())
app.use('/api/user',userRouter)


app.listen(5000,()=>{
    console.log("yeeey ia m running on a port ~~")
})