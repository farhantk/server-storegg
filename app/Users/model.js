const mongoose =  require('mongoose')

let userSchema = mongoose.Schema({
    email:{
        type: String,
        require: [true, 'Please fill email']
    },
    name:{
        type: String,
        require: [true, 'Please fill name']
    },
    password:{
        type: String,
        require: [true, 'Please fill password']
    },
    role:{
        type: String,
        enum: ['Admin', 'user' ],
        default: 'Admin'
    },
    phoneNumber:{
        type: String,
        require: [true, 'Please fill phone number']
    },

}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)