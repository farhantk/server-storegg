const mongoose =  require('mongoose')

let bankSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Please fill bank name']
    }
})

module.exports = mongoose.model('Bank', bankSchema)