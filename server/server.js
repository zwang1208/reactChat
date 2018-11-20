const express = require('express')
const userRouter = require('./user')
const utils = require('utility') //md5
const bodyParser = require('body-parser') //post
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.listen(8010, function(){
    console.log('server run on port 8010')
})