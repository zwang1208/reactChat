const express = require('express')
const utils = require('utility')//md5

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {pwd: 0, __v: 0}

// Chat.remove({}, function(e,d){

// })

Router.get('/list', function(req, res){
    //User.deleteMany({},function(){})
    const { type } = req.query
    User.find({type}, function(err, doc){
        return res.json({code: 0, data: doc})
    })
})

Router.get('/getmsglist',function(req,res){
	const user = req.cookies.user_id
    //console.log(user)
	User.find({},function(e,userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
		})
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if (!err) {
				return res.json({code:0,msgs:doc, users:users})
			}
		})

	})
})

Router.post('/update', function(req, res){
    const user_id = req.cookies.user_id
    if(!user_id){
        return json.dumps({code: 1})
    }
    const body = req.body
    User.findByIdAndUpdate(user_id, body, function(err, doc){
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 0, data})
    })
})

Router.post('/login', function(req, res){
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc){
        if(!doc){
            return res.json({code: 1, msg: 'username or password is incorrect'})
        }
        res.cookie('user_id', doc._id)
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

        const userModel = new User({user, type, pwd: md5Pwd(pwd)})

        userModel.save(function(err, doc){
            if(err){
                return res.json({code: 1, msg:'error occurred'})
            }
            const {user, type, _id} = doc
            res.cookie('user_id', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
})

Router.get('/info', function(req, res){
    const{user_id} = req.cookies
    if(!user_id){
        return res.json({code: 1})
    }
    User.findOne({_id: user_id}, _filter, function(err, doc){
        if(err){
            return res.json({code: 1, msg: 'error occurred'})
        }
        if(doc){
            return res.json({code: 0, data: doc})
        }
    })
})



//security
function md5Pwd(pwd){
    const salt = 'guess_the_password_sad8u&nh238#23HJkas@ue%@'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router