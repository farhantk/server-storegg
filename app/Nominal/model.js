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
}, {timestamps: true})

module.exports = mongoose.model('Nominal', nominalSchema)