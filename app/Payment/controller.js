const Bank = require('../Bank/model')
const Payment = require('./model')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')

            const alert = {message: alertMessage, status: alertStatus}
            const payment  = await Payment.find().populate('banks')
            const banks = await Bank.find()

            res.render('Admin/Payment/index', {
                name: req.session.user.name,
                title: 'Payment',
                payment,
                banks,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    view_update: async(req, res)=>{
        try {
            const {id} = req.params
            const payment = await Payment.findOne({_id: id})
            const banks = await Bank.find()

            res.render('Admin/Payment/update',{
                name: req.session.user.name,
                title: 'Payment',
                payment,
                banks
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionCreate: async(req, res)=>{
        try {
            const {type, banks} = req.body
            let payment = await Payment({type, banks})
            await payment.save()

            req.flash('alertMessage', 'Add payment method successfuly')
            req.flash('alertStatus', 'success')

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionUpdate: async(req, res)=>{
        try {
            
            const {id} = req.params
            const {type, banks} = req.body

            
            let payment = await Payment.findOneAndUpdate({
                _id: id
            },{
                type, banks
            })
            req.flash('alertMessage', 'Update payment method successfuly')
            req.flash('alertStatus', 'success')
            
            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionRemove: async(req, res)=>{
        try {
            
            const {id} = req.params
            let payment = await Payment.findOneAndDelete({_id:id})

            req.flash('alertMessage', 'Remove payment method successfuly')
            req.flash('alertStatus', 'success')
            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },




}