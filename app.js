const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const userRouter= require('./routes/user')

app.use(express.json())
app.use('/api/user',userRouter)

module.exports = app