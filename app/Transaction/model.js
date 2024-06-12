const mongoose =  require('mongoose')

let transactionSchema = mongoose.Schema({
    historyVoucherTopup:{
        gameName:{
            type: String,
            require: [true, 'Must be fill']
        },
        category:{
            type: String,
            require: [true, 'Must be fill']
        },
        thumbnail:{
            type: String,
            require: [true, 'Must be fill']
        },
        nominal:{
            type: String,
            require: [true, 'Must be fill']
        },
        coinName:{
            type: String,
            require: [true, 'Must be fill']
        },
        quantity:{
            type: String,
            require: [true, 'Must be fill']
        },
        price:{
            type: Number,
            require: [true, 'Must be fill']
        },

    },
    historyPayment:{
        name:{
            type: String,
            require: [true, 'Must be fill']
        },
        type:{
            type: String,
            require: [true, 'Must be fill']
        },
        bank:{
            type: String,
            require: [true, 'Must be fill']
        },
        accNumber:{
            type: String,
            require: [true, 'Must be fill']
        }
    },
    name:{
        type: String,
        require: [true, 'Must be fill'],
        minlength: [3, 'Must be fill'],
        maxlength: [225, 'Must be fill']
    },
    userAcount:{
        type: String,
        require: [true, 'Must be fill'],
        minlength: [3, 'Must be fill'],
        maxlength: [225, 'Must be fill']
    },
    voucherTopup:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher'
    },
    tax:{
        type: Number,
        default: 0
    },
    value:{
        type: Number,
        default: 0
    },
    status:{
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    player:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    historyUser:{
        name:{
            type: String,
            require: [true, 'Must be fill']
        },
        phoneNumber:{
            type: Number,
            minlength: [9, 'Must be fill'],
            maxlength: [225, 'Must be fill']
        }
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)