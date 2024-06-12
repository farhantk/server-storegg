const mongoose =  require('mongoose')

let categorySchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Please fill category name']
    }
}, {timestamps: true})

module.exports = mongoose.model('Category', categorySchema)