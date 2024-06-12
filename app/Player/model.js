const mongoose =  require('mongoose')
const bcrypt = require('bcrypt')
const HASH_ROUND = 10
let playerSchema = mongoose.Schema({
    email:{
        type: String,
        require: [true, 'Please fill email']
    },
    name:{
        type: String,
        require: [true, 'Please fill name'],
        minlength: [3, 'Must be fill'],
        maxlength: [225, 'Must be fill']
    },
    username:{
        type: String,
        require: [true, 'Please fill name'],
        minlength: [3, 'Must be fill'],
        maxlength: [225, 'Must be fill']
    },
    avatar:{
        type: String,
        require: [true, 'Please fill name']
    },
    password:{
        type: String,
        require: [true, 'Please fill password'],
        maxlength: [225, 'Must be fill']
    },
    role:{
        type: String,
        enum: ['Admin', 'user' ],
        default: 'user'
    },
    phoneNumber:{
        type: String,
        require: [true, 'Please fill phone number'],
        minlength: [9, 'Must be fill'],
        maxlength: [14, 'Must be fill']
    },

}, {timestamps: true})

playerSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('Player').countDocuments({email: value})
        return !count
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} already registered`)

playerSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model('Player', playerSchema)