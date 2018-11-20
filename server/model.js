const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017'

mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
    console.log('mongodb connect successful')
})

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        'avatar': {type: String},
        'intro': {type: String},
        'title': {type: String},
        'company': {type: String},
        'salary': {type: String}
    },
    chat: {

    }
}

for( m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name){
        return mongoose.model(name)
    }
}