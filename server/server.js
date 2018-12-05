const express = require('express')
const userRouter = require('./user')
const utils = require('utility') //md5
const bodyParser = require('body-parser') //post
const cookieParser = require('cookie-parser')

const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){
    //console.log('user login')
    socket.on('sendmsg', function(data){
        // io.emit('receivemsg', data)
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content: msg}, function(err, doc){
            io.emit('receivemsg', Object.assign({}, doc._doc))
            console.log(doc)
        })
    })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(8010, function(){
    console.log('server run on port 8010')
})