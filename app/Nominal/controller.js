const Nominal = require('./model')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')

            const alert = {message: alertMessage, status: alertStatus}

            const nominal  = await Nominal.find()
            console.log(alert)
            res.render('Admin/Nominal/index', {
                nominal,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    view_update: async(req, res)=>{
        try {
            const {id} = req.params
            const nominal = await Nominal.findOne({_id: id})

            res.render('Admin/Nominal/update',{
                nominal
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    actionCreate: async(req, res)=>{
        try {
            const {name, quantity, price} = req.body
            let nominal = await Nominal({name, quantity, price})
            await nominal.save()

            req.flash('alertMessage', 'Add nominal successfuly')
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    actionUpdate: async(req, res)=>{
        try {
            
            const {id} = req.params
            const {name, quantity, price} = req.body

            
            let nominal = await Nominal.findOneAndUpdate({
                _id: id
            },{
                name, quantity, price
            })
            console.log(nominal)
            req.flash('alertMessage', 'Update nominal successfuly')
            req.flash('alertStatus', 'success')
            
            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },

    actionRemove: async(req, res)=>{
        try {
            
            const {id} = req.params
            let nominal = await Nominal.findOneAndDelete({_id:id})

            req.flash('alertMessage', 'Remove nominal successfuly')
            req.flash('alertStatus', 'success')
            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },




}