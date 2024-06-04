const mongoose =  require('mongoose')

let nominalSchema = mongoose.Schema({
    quantity:{
        type: Number,
        default: 0,
    },
    name:{
        type: String,
        require: [true, 'Name must be filled']
    },
    price:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Nominal', nominalSchema)