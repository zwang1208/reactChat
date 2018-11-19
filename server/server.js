const express = require('express')
const userRouter = require('./user')

const app = express()

app.use('/user', userRouter)

app.listen(8010, function(){
    console.log('server run on port 8010')
})