const mongoose =  require('mongoose')

let paymentSchema = mongoose.Schema({
    type:{
        type: String,
        require: [true, 'Please fill payment type']
    },
    status:{
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    accNumber:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank'

    }]
})

module.exports = mongoose.model('Payment', bankSchema)