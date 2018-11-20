const express = require('express')
const utils = require('utility')//md5

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function(req, res){
    //User.deleteMany({},function(){})
    User.find({}, function(err, doc){
        return res.json(doc)
    })
})

Router.post('/login', function(req, res){
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5Pwd(pwd)}, {pwd: 0}, function(err, doc){
        if(!doc){
            return res.json({code: 1, msg: 'username or password is incorrect'})
        }
        return res.json({code: 0, data: doc})
    })
})

Router.post('/register', function(req, res){
    //console.log(req.body)
    const {user, pwd, type} = req.body
    User.findOne({user}, function(err, doc){
        if(doc){
            return res.json({code: 1, msg:'duplicate name'})
        }
        User.create({user, type, pwd: md5Pwd(pwd)}, function(err, doc){
            if(err){
                console.log(err)
                return res.json({code: 1, msg:'error occurred'})
            }
            return res.json({code: 0})
        })
    })
})

Router.get('/info', function(req, res){
    return res.json({code: 1})
})

//security
function md5Pwd(pwd){
    const salt = 'guess_the_password_sad8u&nh238#23HJkas@ue%@'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router